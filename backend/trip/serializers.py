from rest_framework import serializers

from category.serializers import CategorySerializer
from itinerary.serializers import ItinerarySerializer
from trip.models import Trip
from user.serializers import UserSerializer


class TripSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    companions = UserSerializer(read_only=True, many=True)
    itineraries = ItinerarySerializer(many=True)
    categories = CategorySerializer(read_only=True, many=True)
    parent_trip = serializers.SerializerMethodField(read_only=True)
    liked_by = UserSerializer(read_only=True, many=True)
    liked_count = serializers.SerializerMethodField()

    def get_parent_trip(self, trip):
        if trip.parent_trip is not None:
            return TripSerializer(trip.parent_trip, many=False).data
        return None

    def get_liked_count(self, trip):
        return trip.liked_by.count()

    class Meta:
        model = Trip
        fields = '__all__'
