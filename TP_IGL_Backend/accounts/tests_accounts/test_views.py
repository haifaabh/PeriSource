from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from ..models import CustomUser

class GetModeratorsViewTests(TestCase):
    def setUp(self):
        self.moderator1 = CustomUser.objects.create(username='moderator1', email='moderator1@exp.com', name='moderator1', role=CustomUser.Role.Moderator)
        self.moderator2 = CustomUser.objects.create(username='moderator2', email='moderator2@exp.com', name='moderator2', role=CustomUser.Role.Moderator)
        self.non_moderator = CustomUser.objects.create(username='user1', email='user1@exp.com', name='user1', role=CustomUser.Role.User)
        self.client = APIClient()

    def test_get_moderators(self):
        url = reverse('get_moderators') 
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        expected_usernames = ['moderator1', 'moderator2']
        for user_data in response.data:
            self.assertIn(user_data['username'], expected_usernames)
