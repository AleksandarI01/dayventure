from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from itinerary.models import Itinerary
from itinerary.serializers import ItinerarySerializer
from poi.models import POI
from trip.models import Trip


class CreateItineraryView(CreateAPIView):
    """
        post:
        Create a new Itinerary for a Trip
    """
    queryset = Itinerary.objects.all()             # todo: permission: user = trip.owner (and companions?)
    serializer_class = ItinerarySerializer

    def post(self, request, *args, **kwargs):
        trip_id = self.kwargs.get('trip_id')
        it_type = request.data['type']
        it_poi = None
        it_transfer = None
        if it_type == 0:
            data = request.data['poi']
            poi_instance = POI.objects.all()
            poi_instance.update_or_create(gm_place_id=data['gm_place_id'], defaults=data)
            it_poi = POI.objects.get(gm_place_id=data['gm_place_id'])
        elif it_type == 1:
            # Deprecated
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        itinerary_serializer = self.get_serializer(data=request.data)
        itinerary_serializer.is_valid(raise_exception=True)
        itinerary_serializer.save(trip=Trip.objects.get(pk=trip_id), poi=it_poi, transfer=it_transfer)
        return Response(itinerary_serializer.data)


class RetrieveUpdateDeleteItineraryView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a specific itinerary by ID and display all the information

        patch:
        Update a specific itinerary (allowed only for owner or admin)

        delete:
        Delete a specific itinerary (allowed only for owner or admin)
    """
    # permission_classes = [IsOwnerAdminOrReadOnly, ]
    # permission_classes = [IsLoggedInUserOrStaff]
    queryset = Itinerary.objects.all()                       # todo: permission: user = trip.owner  or readonly
    serializer_class = ItinerarySerializer
    lookup_url_kwarg = 'itinerary_id'

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass
