from rest_framework import serializers

from review.models import Review
from trip.serializers import TripSerializer
from user.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    trip = TripSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
