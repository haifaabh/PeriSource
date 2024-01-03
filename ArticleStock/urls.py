from django.urls import path
from . import views


urlpatterns=[
path('hello/',views.say_hello),
path('verify/',views.verify_elasticsearch_connection),
path('add/',views.add_article),
path('have/',views.retrieve_all_data),
path('extract/',views.extract_text_from_pdf),
path('search/',views.search_articles),
path('articles/<str:article_id>/', views.retrieve_article_by_id, name='retrieve_article_by_id'),
path('search_auteurs/',views.search_articles_by_auteurs),
path('search_mots_cles/',views.search_articles_by_mots_cles),
path('search_institutions/',views.search_articles_by_institutions),
path('upload/',views.upload)

]