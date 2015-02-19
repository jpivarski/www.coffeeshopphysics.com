# -*- coding: utf-8 -*-
module Jekyll
  module UpToCut
    def uptocut(input)
      input.gsub(Regexp.new('<!-- more -->(.|\n)*'), '').gsub(Regexp.new('---'), '—').gsub(Regexp.new('--'), '–').gsub(Regexp.new('``'), '“').gsub(Regexp.new("''"), '”').gsub(Regexp.new('`'), '‘').gsub(Regexp.new("'"), '’')
    end
  end
end

Liquid::Template.register_filter(Jekyll::UpToCut)
