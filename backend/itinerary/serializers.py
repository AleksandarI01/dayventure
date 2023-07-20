from datetime import datetime, date

from rest_framework import serializers

from itinerary.models import Itinerary
from poi.serializers import POISerializer
from transfer.serializers import TransferSerializer


class ItinerarySerializer(serializers.ModelSerializer):
    poi = POISerializer(read_only=True)
    transfer = TransferSerializer(read_only=True)
    end_time = serializers.SerializerMethodField()

    def get_end_time(self, itinerary):
        dt = datetime.combine(date.today(), itinerary.start_time) + itinerary.duration
        return dt.time()

    class Meta:
        model = Itinerary
        fields = ['sequence', 'type', 'poi', 'transfer', 'start_time', 'duration', 'end_time', 'cost', 'cost_currency']
        read_only_fields = ['end_time', ]
