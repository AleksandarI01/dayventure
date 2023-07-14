from rest_framework import serializers

from poi.models import POI


class POISerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = '__all__'
