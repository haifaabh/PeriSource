# serializers.py
import datetime
from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    auteurs = serializers.ListField(child=serializers.CharField(), required=False)  # Handle list of authors
    institutions = serializers.ListField(child=serializers.CharField(), required=False)
    mots_cles = serializers.ListField(child=serializers.CharField(), required=False)  # Handle list of keywords
    references_bibliographiques = serializers.ListField(child=serializers.CharField(), required=False)  # Handle list of references
    validated = serializers.BooleanField(default=False, required=False)
    date = serializers.DateField(allow_null=True, required=False,format='%Y-%m-%d')
    class Meta:
        model = Article
        fields ="__all__"
    def create(self, validated_data):
        # Set default values for new fields if not provided in the request
        validated_data.setdefault('validated', False)
        validated_data.setdefault('date', None)

        return super().create(validated_data)
