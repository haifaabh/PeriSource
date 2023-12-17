from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
  path('register', register),
  path('login', MyTokenObtainPairView.as_view()),
  path('token/refresh', TokenRefreshView.as_view()),
  path('users', UserViewSet.as_view({'get': 'list'})),
  path('get_moderators', get_moderators),
  path('delete_moderator/<int:id>/', delete_moderator)
]