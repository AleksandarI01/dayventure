from django.db import models
from django.utils import timezone


class EmailScheduler(models.Model):
    from_email = models.CharField(max_length=150, default='best.motion.ever.group3@gmail.com')
    recipient_list = models.TextField(blank=True)
    subject = models.CharField(max_length=150, blank=True)
    message = models.TextField(blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    scheduled_date = models.DateTimeField(default=timezone.now)
    sent_date = models.DateTimeField(default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.from_email} --> {self.recipient_list}: {self.subject}'
