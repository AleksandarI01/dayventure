import datetime
import time

from django.core.management.base import BaseCommand

from notification.models import Notification
from trip.models import Trip


class Command(BaseCommand):
    help = 'This command will daily create notifications on passed trips (2 days after travel_date)'

    def handle(self, *args, **options):
        time.sleep(60)
        while True:
            trips = Trip.objects.filter(travel_date__lt=datetime.datetime.today() - datetime.timedelta(days=2))\
                .exclude(notifications__type=1)

            for trip in trips:
                note_instance = Notification.objects.all()
                note_instance.create(type=1, recipient=trip.owner, trip=trip)
                for companion in trip.companions.all():
                    note_instance.create(type=1, recipient=companion, trip=trip)

            time.sleep(86400)
