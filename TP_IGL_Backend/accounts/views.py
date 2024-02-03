from elasticsearch import NotFoundError
from rest_framework.response import Response

from ArticleStock.search_index import ArticleDocument
from .serializers import CustomUserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.decorators import api_view, permission_classes
from allauth.account.utils import send_email_confirmation, user_email, setup_user_email
from django.dispatch import receiver
from allauth.account.signals import email_confirmed
from .models import CustomUser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.name
        token['role'] = user.role
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
@receiver(email_confirmed)
def email_confirmed_handler(request, email_address, **kwargs):
    user = email_address.user
    user.is_active = True
    user.save()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_email_confirmation(request, user, signup=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    
    
@api_view(['GET'])
@permission_classes([AllowAny])
def retrieve_user(request, id):
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CustomUserSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_user(request, id):
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        data = request.data
        serializer = CustomUserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_moderators(request):
    if request.method == 'GET':
        moderators = CustomUser.objects.filter(role='moderator')
        serializer = CustomUserSerializer(moderators, many=True)
        return Response(serializer.data)
    
@api_view(['DELETE'])
def delete_moderator(request, id):
    try:
        moderator = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    moderator.delete()
    return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def add_article_to_favorites(request, username):
    try:
        user = CustomUser.objects.get(username=username,role=CustomUser.Role.User)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    article_id = request.data.get('article_id')
    if not article_id:
        return Response({"detail": "article_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        article = ArticleDocument.get(id=article_id).to_dict()
    except NotFoundError:
        return Response({"detail": "Article not found"}, status=status.HTTP_404_NOT_FOUND)

    if article_id not in user.favorites:
        user.favorites.append(article_id)
        user.save()

    user_serializer = CustomUserSerializer(user)
    return Response(user_serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def remove_article_from_favorites(request, username):
    try:
        user = CustomUser.objects.get(username=username,role=CustomUser.Role.User)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    article_id = request.data.get('article_id')
    if not article_id:
        return Response({"detail": "article_id is required"}, status=status.HTTP_400_BAD_REQUEST)


    if article_id in user.favorites:
        user.favorites.remove(article_id)
        user.save()

    user_serializer = CustomUserSerializer(user)
    return Response(user_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def consulter_favories(request, username):
    try:
        user = CustomUser.objects.get(username=username, role=CustomUser.Role.User)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found or not of the required role"}, status=status.HTTP_404_NOT_FOUND)

    article_ids = user.favorites
    response_data = {
        "article_ids": article_ids,
    }

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def remove_article_from_favorites(request, username):
    try:
        user = CustomUser.objects.get(username=username,role=CustomUser.Role.User)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    article_id = request.data.get('article_id')
    if not article_id:
        return Response({"detail": "article_id is required"}, status=status.HTTP_400_BAD_REQUEST)


    if article_id in user.favorites:
        user.favorites.remove(article_id)
        user.save()

    user_serializer = CustomUserSerializer(user)
    return Response(user_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def consulter_favories(request, username):
    try:
        user = CustomUser.objects.get(username=username, role=CustomUser.Role.User)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found or not of the required role"}, status=status.HTTP_404_NOT_FOUND)

    article_ids = user.favorites
    response_data = {
        "article_ids": article_ids,
    }

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['GET'])
def consulter_favories(request, username):
    try:
        user = CustomUser.objects.get(username=username, role=CustomUser.Role.User)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found or not of the required role"}, status=status.HTTP_404_NOT_FOUND)

    article_ids = user.favorites
    articles = []

    for article_id in article_ids:
        article = ArticleDocument.get(id=article_id).to_dict()
        articles.append(article)

    response_data = {
        "articles": articles,
    }

    return Response(response_data, status=status.HTTP_200_OK)