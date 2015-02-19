# -*- coding: utf-8 -*-
module Jekyll
  module RegexFilter
    def replace_regex(input)
      input.gsub(Regexp.new('---'), '—').gsub(Regexp.new('--'), '–').gsub(Regexp.new('``'), '“').gsub(Regexp.new("''"), '”').gsub(Regexp.new('`'), '‘').gsub(Regexp.new("'"), '’')
    end
  end
end

Liquid::Template.register_filter(Jekyll::RegexFilter)
