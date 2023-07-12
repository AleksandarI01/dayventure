from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class UserRegistration(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='user_registration', primary_key=True)
    code = models.CharField(max_length=6)

    def __str__(self):
        return f'registration-code : {self.user.email}'
