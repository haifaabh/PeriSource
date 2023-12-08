from django.urls import path
from .views import register, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
  path('register', register),
  path('login', MyTokenObtainPairView.as_view()),
  path('token/refresh', TokenRefreshView.as_view()),
]