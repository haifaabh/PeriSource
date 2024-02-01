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

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.name = validated_data.get('name', instance.name)
        instance.role = validated_data.get('role', instance.role)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.favorites = validated_data.get('favorites', instance.favorites)

        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance