from django.apps import AppConfig
import logging
from django.apps import AppConfig
from django.conf import settings
from elasticsearch_dsl.connections import connections


class ArticlestockConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ArticleStock'

    def ready(self):
        connections.configure(**settings.ELASTICSEARCH_DSL)
