from rest_framework import serializers

from category.serializers import CategorySerializer
from itinerary.serializers import ItinerarySerializer
from trip.models import Trip
from user.serializers import UserSerializer


class TripSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    companions = UserSerializer()
    itineraries = ItinerarySerializer()
    categories = CategorySerializer()
    parent_trip = serializers.SerializerMethodField()
    liked_by = UserSerializer()
    liked_count = serializers.SerializerMethodField()

    def get_parent_trip(self, trip):
        return TripSerializer(trip.parent_trip, many=False).data

    def get_liked_count(self, trip):
        return trip.liked_by.count()

    class Meta:
        model = Trip
        fields = '__all__'
