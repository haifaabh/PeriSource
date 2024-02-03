from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import json
import requests

class SearchArticlesTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.driver = webdriver.Chrome()
        cls.base_url = 'http://localhost:8000'

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super().tearDownClass()

    def test_search_articles(self):
        print('This test will only work if there is an article with id 1 that has keyword Test')
        response = requests.post(f'{self.base_url}/ArticleStock/search/', json={"keywords": ["Test"]})
        self.assertEqual(response.status_code, 200)
        article_ids = response.json().get('article_ids', [])
        self.assertIn('1', article_ids)
