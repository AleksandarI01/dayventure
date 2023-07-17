from django.db import models
from django.contrib.auth import get_user_model

from category.models import Category

User = get_user_model()


def user_avatar_directory_path(instance, filename):
    return f'user/{instance.user_id}/avatar/{filename}'


def user_banner_directory_path(instance, filename):
    return f'user/{instance.user_id}/banner/{filename}'


class UserProfile(models.Model):
    user = models.OneToOneField(to=User, related_name='user_profile', on_delete=models.CASCADE, primary_key=True)
    location = models.CharField(max_length=250, blank=True)
    avatar = models.ImageField(upload_to=user_avatar_directory_path, blank=True, null=True)
    banner = models.ImageField(upload_to=user_banner_directory_path, blank=True, null=True)
    about = models.TextField(max_length=250, blank=True)
    score = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    liked_categories = models.ManyToManyField(to=Category, related_name='liked_by')

    def __str__(self):
        return f"{self.user.username}"
