from rest_framework import serializers

from category.models import Category


class CategorySerializer(serializers.ModelSerializer):
    trip_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    def get_trip_count(self, cat):
        return cat.trips.count()

    def get_like_count(self, cat):
        return cat.liked_by.count()

    class Meta:
        model = Category
        fields = '__all__'
