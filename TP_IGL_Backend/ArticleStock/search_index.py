from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Article



@registry.register_document
class ArticleDocument(Document):
    class Index:
        name = 'articles_igl'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    titre = fields.TextField()
    resume = fields.TextField()
    auteurs = fields.TextField()  # Assuming a comma-separated list of author names
    institutions = fields.TextField()  # Assuming a comma-separated list of institutions
    mots_cles = fields.TextField()  # Assuming a comma-separated list of keywords
    texte_integral = fields.TextField()
    url_pdf = fields.TextField()
    references_bibliographiques = fields.TextField()
    validated = fields.BooleanField()
    class Django:
        model = Article