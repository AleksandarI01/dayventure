from rest_framework import serializers

from notification.models import Notification
from trip.serializers import TripSerializer


class NotificationSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['type', 'recipient']
