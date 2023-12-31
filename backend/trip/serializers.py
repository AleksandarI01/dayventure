from rest_framework import serializers

from category.serializers import CategorySerializer
from itinerary.serializers import ItinerarySerializer
from trip.models import Trip
from user.serializers import UserSerializer


class TripSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    companions = UserSerializer(read_only=True, many=True)
    itineraries = ItinerarySerializer(many=True)
    parent_trip = serializers.SerializerMethodField(read_only=True)
    liked_by = UserSerializer(read_only=True, many=True)
    liked_count = serializers.SerializerMethodField()
    has_reviewed = serializers.SerializerMethodField()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categories'] = CategorySerializer(instance.categories, many=True).data
        return representation

    def get_parent_trip(self, trip):
        if trip.parent_trip is not None:
            return TripSerializer(trip.parent_trip, many=False).data
        return None

    def get_liked_count(self, trip):
        return trip.liked_by.count()

    def get_has_reviewed(self, trip):
        if self.context['request'].user.id is None:
            return None
        if not trip.reviews.filter(user=self.context['request'].user):
            return False
        return True

    class Meta:
        model = Trip
        fields = '__all__'
        read_only_fields = ['liked_count', 'has_reviewed']


class CreateTripSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    companions = UserSerializer(read_only=True, many=True)
    itineraries = ItinerarySerializer(read_only=True, many=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['categories'] = CategorySerializer(instance.categories, many=True).data
        return representation

    class Meta:
        model = Trip
        fields = '__all__'
        read_only_fields = ['rating_avg', 'rating_count', 'liked_by']
