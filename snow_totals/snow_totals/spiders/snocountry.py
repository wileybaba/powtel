# -*- coding: utf-8 -*-
import scrapy


class SnocountrySpider(scrapy.Spider):
    name = 'snocountry'
    allowed_domains = ['https://www.snocountry.com/']
    start_urls = ['https://www.snocountry.com/snow-reports/us/rockies']

    def parse(self, response):
        pass
