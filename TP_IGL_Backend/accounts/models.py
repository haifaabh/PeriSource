from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, name, role, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, name=name, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name, role="Admin", password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, username, name, role, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):

    class Role(models.TextChoices):
        Admin = 'admin', 'Admin'
        Moderator = 'moderator', 'Moderator'
        User = 'user', 'User'

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=30)
    role = models.CharField(max_length=30, choices=Role.choices, default=Role.User)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name']