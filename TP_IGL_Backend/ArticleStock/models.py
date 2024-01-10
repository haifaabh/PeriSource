# models.py

from django.db import models

class Article(models.Model):
    titre = models.CharField(max_length=200)
    resume = models.TextField()
    auteurs = models.CharField(max_length=500)  # Assuming a comma-separated list of author names
    institutions = models.CharField(max_length=500)  # Assuming a comma-separated list of institutions
    mots_cles = models.CharField(max_length=200)  # Assuming a comma-separated list of keywords
    texte_integral = models.TextField()
    url_pdf = models.TextField()
    references_bibliographiques = models.TextField()
    validated = models.BooleanField(default=False)
    date = models.DateField(null=True, blank=True)
