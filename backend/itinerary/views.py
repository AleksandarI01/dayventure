from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from itinerary.models import Itinerary
from itinerary.serializers import ItinerarySerializer
from trip.models import Trip


class CreateItineraryView(CreateAPIView):
    """
        post:
        Create a new Itinerary for a Trip
    """
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer

    def post(self, request, *args, **kwargs):
        trip_id = self.kwargs.get('trip_id')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # todo: update_or_create POI or Transfer
        serializer.save(trip=Trip.objects.get(pk=trip_id))
        return Response(serializer.data)
