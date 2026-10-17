#!/usr/bin/env ruby
# frozen_string_literal: true

# SEO basics check on a built site: ruby scripts/check-seo.rb <build dir>
# Exits non-zero and lists every problem when the build fails the checks.

require "cgi"
require "uri"

module SeoCheck
  ORIGIN = "https://pmn.nz"

  module_function

  def meta(html, attr, name)
    tag = html.scan(/<meta\s[^>]*>/i).find { |t| t =~ /#{attr}=["']#{Regexp.escape(name)}["']/i }
    m = tag&.match(/content=(?:"([^"]*)"|'([^']*)')/i)
    m && (m[1] || m[2])
  end

  def canonical(html)
    tag = html.scan(/<link\s[^>]*>/i).find { |t| t =~ /rel=["']canonical["']/i }
    tag && tag[/href=["']([^"']*)["']/i, 1]
  end

  def title(html)
    html[%r{<title>(.*?)</title>}mi, 1]&.strip
  end

  def redirect_stub?(html)
    html.match?(/<meta\s[^>]*http-equiv=["']refresh["']/i)
  end

  def pages(dir)
    Dir.glob("**/*.html", base: dir).sort.to_h { |f| [f, File.read(File.join(dir, f), encoding: "UTF-8")] }
  end

  def url_path(file)
    "/" + file.sub(/index\.html\z/, "")
  end

  def page_errors(file, html)
    errs = []
    errs << "no <title>" if title(html).to_s.empty?
    errs << "no meta description" if meta(html, "name", "description").to_s.strip.empty?
    canon = canonical(html)
    if canon.nil?
      errs << "no canonical URL"
    elsif canon != ORIGIN && !canon.start_with?("#{ORIGIN}/")
      errs << "canonical #{canon} is not on #{ORIGIN}"
    end
    errs << "no og:title" if meta(html, "property", "og:title").to_s.empty?
    errs << "no og:url" if meta(html, "property", "og:url").to_s.empty?
    errs.map { |e| "#{file}: #{e}" }
  end

  # A shared image needs og:image and a large-image twitter card.
  def image_errors(html)
    errs = []
    errs << "no og:image" if meta(html, "property", "og:image").to_s.empty?
    errs << "twitter:card is not summary_large_image" if meta(html, "name", "twitter:card") != "summary_large_image"
    errs
  end

  # Posts with an `image:` front-matter value must have og:image and a large card.
  def post_image_errors(root, pages)
    Dir.glob("_posts/*.md", base: root).flat_map do |post|
      front = File.read(File.join(root, post), encoding: "UTF-8")[/\A---\n(.*?)\n---/m, 1].to_s
      next [] unless front.match?(/^image:\s*\S/)

      title = front[/^title:\s*["']?(.*?)["']?\s*$/, 1].to_s
      file, html = pages.find { |f, h| f.start_with?("blog/") && CGI.unescapeHTML(meta(h, "property", "og:title").to_s) == title }
      next ["#{post}: has image: but no built page has og:title #{title.inspect}"] unless file

      image_errors(html).map { |e| "#{file}: #{e}" }
    end
  end

  def sitemap_errors(dir, pages)
    path = File.join(dir, "sitemap.xml")
    return ["sitemap.xml missing"] unless File.exist?(path)

    stubs, real = pages.partition { |_, html| redirect_stub?(html) }.map { |g| g.map { |f, _| url_path(f) } }
    File.read(path, encoding: "UTF-8").scan(%r{<loc>(.*?)</loc>}).flatten.flat_map do |loc|
      p = URI(CGI.unescapeHTML(loc)).path
      if p.match?(%r{\A/404(\.html|/)?\z}) then ["sitemap.xml lists the 404 page: #{loc}"]
      elsif stubs.include?(p) || stubs.include?(p.chomp("/") + ".html") then ["sitemap.xml lists a redirect stub: #{loc}"]
      elsif !real.include?(p) && !real.include?(p.chomp("/") + ".html") && !File.exist?(File.join(dir, p)) then ["sitemap.xml lists a URL not in the build: #{loc}"]
      else []
      end
    end
  end

  def robots_errors(dir)
    path = File.join(dir, "robots.txt")
    return ["robots.txt missing"] unless File.exist?(path)

    File.read(path, encoding: "UTF-8").match?(%r{^Sitemap:\s*#{Regexp.escape(ORIGIN)}/sitemap\.xml\s*$}i) ? [] : ["robots.txt does not point at #{ORIGIN}/sitemap.xml"]
  end

  def title_errors(pages)
    pages.group_by { |_, html| title(html) }.reject { |t, _| t.to_s.empty? }.select { |_, v| v.size > 1 }
         .map { |t, v| "duplicate title #{t.inspect}: #{v.map(&:first).join(', ')}" }
  end

  def run(dir, root: File.expand_path("..", __dir__))
    all = pages(dir)
    real = all.reject { |_, html| redirect_stub?(html) }
    errs = real.flat_map { |f, html| page_errors(f, html) }
    errs + title_errors(real) + post_image_errors(root, real) + sitemap_errors(dir, all) + robots_errors(dir)
  end
end

if $PROGRAM_NAME == __FILE__
  dir = ARGV[0] or abort "usage: check-seo.rb <build dir>"
  errs = SeoCheck.run(dir)
  puts errs
  abort "SEO check failed: #{errs.size} problem(s)" unless errs.empty?
  puts "SEO check passed"
end
