from datetime import timedelta
from django.db import models

from poi.models import POI
from transfer.models import Transfer
from trip.models import Trip

TYPE_CHOICES = [
    (0, 'POI'),
    (1, 'Transfer'),
]


class Itinerary(models.Model):
    trip = models.ForeignKey(to=Trip, related_name='itineraries', on_delete=models.CASCADE)
    sequence = models.IntegerField()
    type = models.IntegerField(choices=TYPE_CHOICES, default=0)
    poi = models.ForeignKey(to=POI, blank=True, null=True, on_delete=models.CASCADE)
    duration = models.DurationField(default=timedelta(hours=1))
    transfer = models.ForeignKey(to=Transfer, blank=True, null=True, on_delete=models.CASCADE)
    transfer_duration = models.DurationField(blank=True, null=True)
    cost = models.FloatField(default=0.0)
    cost_currency = models.CharField(max_length=3, default='CHF')

    def __str__(self):
        return f'trip {self.trip.name} / {self.trip_id} : {self.sequence}'
