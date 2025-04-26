source "https://rubygems.org"
ruby RUBY_VERSION

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 3.9.5"

# Theme
gem "minima", "~> 2.5"
gem 'jekyll-theme-hyde'

# Essential plugins
gem "kramdown-parser-gfm"
gem "pygments.rb"

# Required dependencies that are being removed from Ruby standard library
gem "webrick", "~> 1.8"  # Required for Jekyll serve in Ruby 3.0+
gem "csv"      # Will be removed in Ruby 3.4
gem "base64"   # Will be removed in Ruby 3.4
gem "bigdecimal" # Will be removed in Ruby 3.4

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-paginate-v2", "~> 3.0.0"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-redirect-from"
  gem "jekyll-sass-converter", "~> 1.5.2"
  gem "jekyll-archives", "~> 2.2"
  gem "jekyll-include-cache", "~> 0.2"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
platforms :mingw, :mswin, :x64_mingw, :jruby do
  gem "tzinfo", ">= 1.2.10"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :mswin, :x64_mingw]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

