from django.test import TestCase
from ..models import CustomUser

class CustomUserModelTests(TestCase):
    def test_create_user(self):
        user = CustomUser.objects.create_user(
            email='test@example.com',
            username='testuser',
            name='Test User',
            role='User',
            password='password123'
        )
        self.assertIsNotNone(user)
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.role, 'User')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_active)

    def test_create_superuser(self):
        superuser = CustomUser.objects.create_superuser(
            email='admin@example.com',
            username='adminuser',
            name='Admin User',
            password='adminpassword123'
        )
        self.assertIsNotNone(superuser)
        self.assertEqual(superuser.email, 'admin@example.com')
        self.assertEqual(superuser.username, 'adminuser')
        self.assertEqual(superuser.name, 'Admin User')
        self.assertEqual(superuser.role, 'Admin')
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_superuser)
