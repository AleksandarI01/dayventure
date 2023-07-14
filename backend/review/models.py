from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth import get_user_model

from trip.models import Trip

User = get_user_model()


class Review(models.Model):
    rating = models.IntegerField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])
    user = models.ForeignKey(to=User, related_name='reviews', blank=True, null=True, on_delete=models.SET_NULL)
    trip = models.ForeignKey(to=Trip, related_name='reviews', on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id} {self.user.username}: {self.trip.name}'

    def save(self, *args, **kwargs):
        super(Review, self).save(*args, **kwargs)
        self.trip.update_rating_fields()
