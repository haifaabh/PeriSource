# serializers.py
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    auteurs = serializers.ListField(child=serializers.CharField(max_length=100))
    institutions = serializers.ListField(child=serializers.CharField(max_length=100))
    mots_cles = serializers.ListField(child=serializers.CharField(max_length=100))
    references_bibliographiques = serializers.ListField(child=serializers.CharField(max_length=None))
    publication_date = serializers.DateField()

    class Meta:
        model = Article
        fields = "__all__"
