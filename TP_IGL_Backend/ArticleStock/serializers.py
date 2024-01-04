# serializers.py
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    auteurs = serializers.ListField(child=serializers.CharField())  # Handle list of authors
    institutions = serializers.ListField(child=serializers.CharField())  # Handle list of institutions
    mots_cles = serializers.ListField(child=serializers.CharField())  # Handle list of keywords
    references_bibliographiques = serializers.ListField(child=serializers.CharField())  # Handle list of references
    class Meta:
        model = Article
        fields ="__all__"
