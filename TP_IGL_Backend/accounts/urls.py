from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView, 
)
urlpatterns = [
  path('register', register),
  path('login', MyTokenObtainPairView.as_view()),
  path('token/refresh', TokenRefreshView.as_view()),
  path('users', UserViewSet.as_view({'get': 'list'})),
  path('get_moderators', get_moderators, name='get_moderators'),
  path('delete_moderator/<int:id>/', delete_moderator),
  path('retrieve_user/<str:id>/', retrieve_user), 
  path('update_user/<str:id>/', update_user), 
  path('add_to_favorites/<str:username>/', add_article_to_favorites),
   path('consulter_favories/<str:username>/', consulter_favories),
]