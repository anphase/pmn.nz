# frozen_string_literal: true

require "minitest/autorun"
require_relative "../scripts/ruby-coverage"

class RubyCoverageTest < Minitest::Test
  RESULT = {
    lines: [1, 0, nil, 2],
    branches: { [:if, 0, 2] => { [:then, 1, 2] => 1, [:else, 2, 2] => 0 } },
  }.freeze

  def test_summary_counts_hit_lines_and_branches
    assert_equal({ lines: 66.67, branches: 50.0 }, RubyCoverage.summary(RESULT))
  end

  def test_summary_is_full_when_nothing_is_countable
    assert_equal({ lines: 100.0, branches: 100.0 }, RubyCoverage.summary({ lines: [nil], branches: {} }))
  end

  def test_shortfalls_names_each_kind_under_its_floor
    summary = RubyCoverage.summary(RESULT)
    assert_empty RubyCoverage.shortfalls(summary, { lines: 66.67, branches: 50.0 })
    assert_equal ["lines 66.67% is under the 70.0% floor", "branches 50.0% is under the 80.0% floor"],
                 RubyCoverage.shortfalls(summary, { lines: 70.0, branches: 80.0 })
  end
end
