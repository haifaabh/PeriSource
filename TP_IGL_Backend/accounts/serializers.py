from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    favorites = serializers.ListField(child=serializers.CharField(), allow_empty=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'name', 'role', 'is_staff', 'is_active', 'password', 'favorites')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        favorites_data = validated_data.pop('favorites', [])
        user = CustomUser.objects.create_user(**validated_data)
        user.favorites = favorites_data
        return user
