#!/usr/bin/env ruby
# frozen_string_literal: true

# Line and branch coverage of one Ruby file under its minitest file, from the stdlib Coverage
# module (no gem): ruby scripts/ruby-coverage.rb <source.rb> <test.rb> <min line %> <min branch %>
# Prints the percentages and exits non-zero when either is under its floor or a test fails.

require "coverage"

module RubyCoverage
  module_function

  def percent(hits)
    return 100.0 if hits.empty?

    (hits.count(&:positive?) * 100.0 / hits.size).round(2)
  end

  # One file's Coverage.result entry: lines is hits per line (nil where nothing runs),
  # branches maps each branch point to hits per target.
  def summary(result)
    { lines: percent(result[:lines].compact), branches: percent(result[:branches].values.flat_map(&:values)) }
  end

  def shortfalls(summary, floor)
    summary.filter_map { |kind, pct| "#{kind} #{pct}% is under the #{floor[kind]}% floor" if pct < floor[kind] }
  end
end

if $PROGRAM_NAME == __FILE__
  source, test, *floors = ARGV
  abort "usage: ruby-coverage.rb <source.rb> <test.rb> <min line %> <min branch %>" unless floors.size == 2
  floor = { lines: Float(floors[0]), branches: Float(floors[1]) }
  ARGV.clear # minitest reads ARGV as its own options
  Coverage.start(lines: true, branches: true)
  # Registered before minitest/autorun registers its own at_exit, so this runs after the tests.
  at_exit do
    next if $! && !($!.is_a?(SystemExit) && $!.success?)

    result = Coverage.result.fetch(File.expand_path(source)) { abort "#{source} was never loaded by #{test}" }
    summary = RubyCoverage.summary(result)
    puts "coverage #{source}: lines #{summary[:lines]}% branches #{summary[:branches]}%"
    problems = RubyCoverage.shortfalls(summary, floor)
    abort problems.join("\n") unless problems.empty?
  end
  require File.expand_path(test)
end
