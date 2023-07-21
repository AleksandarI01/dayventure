from rest_framework import serializers

from itinerary.models import Itinerary
from poi.serializers import POISerializer
from transfer.serializers import TransferSerializer


class ItinerarySerializer(serializers.ModelSerializer):
    poi = POISerializer(read_only=True)
    transfer = TransferSerializer(read_only=True)

    class Meta:
        model = Itinerary
        fields = ['id', 'sequence', 'type', 'poi', 'duration', 'transfer', 'transfer_duration',
                  'cost', 'cost_currency']
