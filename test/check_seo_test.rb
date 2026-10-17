# frozen_string_literal: true

require "minitest/autorun"
require "tmpdir"
require "fileutils"
require_relative "../scripts/check-seo"

class CheckSeoTest < Minitest::Test
  def page(title: "T", desc: true, canon: "https://pmn.nz/a/", og: true, extra: "")
    head = +"<title>#{title}</title>"
    head << '<meta name="description" content="d">' if desc
    head << %(<link rel="canonical" href="#{canon}">) if canon
    head << '<meta property="og:title" content="T"><meta property="og:url" content="https://pmn.nz/a/">' if og
    "<html><head>#{head}#{extra}</head></html>"
  end

  def build(files, sitemap: ["https://pmn.nz/a/"], robots: "Sitemap: https://pmn.nz/sitemap.xml\n")
    Dir.mktmpdir do |dir|
      files.each do |f, html|
        FileUtils.mkdir_p(File.dirname(File.join(dir, f)))
        File.write(File.join(dir, f), html)
      end
      File.write(File.join(dir, "sitemap.xml"), sitemap.map { |u| "<url><loc>#{u}</loc></url>" }.join)
      File.write(File.join(dir, "robots.txt"), robots) if robots
      Dir.mktmpdir { |root| return SeoCheck.run(dir, root: root) }
    end
  end

  def test_clean_build_passes
    assert_empty build({ "a/index.html" => page })
  end

  def test_missing_description_fails
    assert_match(/a\/index.html: no meta description/, build({ "a/index.html" => page(desc: false) }).join)
  end

  def test_duplicate_title_fails
    errs = build({ "a/index.html" => page, "b/index.html" => page }, sitemap: [])
    assert_match(/duplicate title/, errs.join)
  end

  def test_canonical_off_origin_fails
    assert_match(/not on https:\/\/pmn.nz/, build({ "a/index.html" => page(canon: "https://example.com/a/") }).join)
  end

  def test_missing_og_fails
    errs = build({ "a/index.html" => page(og: false) }).join
    assert_match(/no og:title/, errs)
    assert_match(/no og:url/, errs)
  end

  def test_sitemap_listing_404_stub_and_unknown
    stub = '<meta http-equiv="refresh" content="0; url=/a/">'
    errs = build({ "a/index.html" => page, "404.html" => page(title: "404", canon: "https://pmn.nz/404.html"),
                   "old/index.html" => stub },
                 sitemap: ["https://pmn.nz/404.html", "https://pmn.nz/old/", "https://pmn.nz/gone/"]).join
    assert_match(/lists the 404 page/, errs)
    assert_match(/redirect stub/, errs)
    assert_match(/not in the build/, errs)
  end

  def test_robots_must_point_at_sitemap
    assert_match(/robots.txt does not point/, build({ "a/index.html" => page }, robots: "User-agent: *\n").join)
  end

  def test_post_with_image_needs_og_image_and_large_card
    Dir.mktmpdir do |root|
      FileUtils.mkdir_p(File.join(root, "_posts"))
      File.write(File.join(root, "_posts/2020-01-01-x.md"), "---\ntitle: T\nimage: /i.png\n---\n")
      Dir.mktmpdir do |dir|
        FileUtils.mkdir_p(File.join(dir, "blog/x"))
        File.write(File.join(dir, "blog/x/index.html"), page(extra: '<meta name="twitter:card" content="summary">'))
        File.write(File.join(dir, "sitemap.xml"), "")
        File.write(File.join(dir, "robots.txt"), "Sitemap: https://pmn.nz/sitemap.xml")
        errs = SeoCheck.run(dir, root: root).join
        assert_match(/no og:image/, errs)
        assert_match(/summary_large_image/, errs)
      end
    end
  end
end
