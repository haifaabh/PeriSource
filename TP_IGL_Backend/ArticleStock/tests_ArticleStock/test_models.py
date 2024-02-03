from django.test import TestCase
from ..models import Article

class ArticleModelTests(TestCase):
    def test_create_article(self):
        article = Article.objects.create(
            titre='Test Title',
            resume='Test summary',
            auteurs='Author1, Author2z',
            institutions='Institution1, Institution2',
            mots_cles='Keyword1, Keyword2',
            texte_integral='Full text of the article',
            url_pdf='http://example.com/article.pdf',
            references_bibliographiques='Reference1, Reference2'
        )

        # Assert that the article was created successfully
        self.assertIsNotNone(article)
        self.assertEqual(article.titre, 'Test Title')
        self.assertEqual(article.resume, 'Test summary')
        self.assertEqual(article.auteurs, 'Author1, Author2')
        self.assertEqual(article.institutions, 'Institution1, Institution2')
        self.assertEqual(article.mots_cles, 'Keyword1, Keyword2')
        self.assertEqual(article.texte_integral, 'Full text of the article')
        self.assertEqual(article.url_pdf, 'http://example.com/article.pdf')
        self.assertEqual(article.references_bibliographiques, 'Reference1, Reference2')
        self.assertFalse(article.validated)
