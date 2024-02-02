from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from ..models import Article

class DeleteArticleViewTests(TestCase):
    def setUp(self):
        self.article = Article.objects.create(
            titre='Test Article',
            resume='Test summary',
            auteurs='Author1, Author2',
            institutions='Institution1, Institution2',
            mots_cles='Keyword1, Keyword2',
            texte_integral='Full text of the article',
            url_pdf='http://example.com/article.pdf',
            references_bibliographiques='Reference1, Reference2'
        )
        self.client = APIClient()

    def test_delete_article(self):
        url = reverse('delete_article', kwargs={'article_id': str(self.article.id)})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
