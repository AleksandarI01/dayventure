from django.db import models
from django.contrib.auth import get_user_model

from trip.models import Trip

User = get_user_model()
TYPE_CHOICE = [
    (0, 'added as companion'),
    (1, 'trip over')
]


class Notification(models.Model):
    type = models.IntegerField(choices=TYPE_CHOICE)
    recipient = models.ForeignKey(to=User, related_name='notifications', on_delete=models.CASCADE)
    trip = models.ForeignKey(to=Trip, related_name='notifications', on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)
    done_date = models.DateTimeField(blank=True, null=True, default=None)

    def __str__(self):
        return f'{self.id}/{self.type} {self.recipient.username}: {self.trip.name}'
