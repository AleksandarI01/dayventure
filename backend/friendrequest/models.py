from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
STATE_CHOICES = [
    ('P', 'pending'),
    ('A', 'accepted'),
    ('R', 'rejected')
]


class Friendrequest(models.Model):

    sender = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='friendrequests_sent')
    receiver = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='friendrequests_received')
    state = models.CharField(max_length=1, choices=STATE_CHOICES, default='P')
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} --> {self.receiver} : {self.state}"
