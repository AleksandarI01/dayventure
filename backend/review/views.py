from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from review.models import Review
from review.serializers import ReviewSerializer
from trip.models import Trip


class CreateTripReviewView(CreateAPIView):
    """
        post:
        Create new rating/review for a trip
    """
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def post(self, request, *args, **kwargs):
        trip_id = self.kwargs.get('trip_id')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, trip=Trip.objects.get(pk=trip_id))
        return Response(serializer.data)
