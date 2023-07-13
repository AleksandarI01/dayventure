from rest_framework import serializers

from itinerary.models import Itinerary
from poi.serializers import POISerializer
from transfer.serializers import TransferSerializer


class ItinerarySerializer(serializers.ModelSerializer):
    poi = POISerializer()
    transfer = TransferSerializer()
    end_time = serializers.SerializerMethodField()

    def get_end_time(self, itinerary):
        return itinerary.start_time + itinerary.duration

    class Meta:
        model = Itinerary
        fields = ['sequence', 'type', 'poi', 'transfer', 'start_time', 'duration', 'end_time', 'cost', 'cost_currency']
        read_only_fields = ['end_time', ]
