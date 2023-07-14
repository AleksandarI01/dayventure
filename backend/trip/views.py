# from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, CreateAPIView
from rest_framework.response import Response

# from email_scheduler.models import EmailScheduler
from trip.models import Trip
from trip.serializers import TripSerializer

User = get_user_model()


class ListTripsView(ListAPIView):
    """
        get:
        List Trips in order of their rating
        all for /api/trips/
        top 5 for /api/home/
        may be filtered by query_param 'category'
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        filter_category = self.request.query_params.get('category', None)
        queryset = Trip.objects.all().order_by('-rating_avg')
        if filter_category is not None:
            queryset = queryset.filter(categories__name=filter_category)
        if self.request._request.path == '/api/home/':
            queryset = queryset[:5]
        return queryset


class CreateTripView(CreateAPIView):
    """
        post:
        Create new trip
    """
    serializer_class = TripSerializer
    queryset = Trip.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        return Response(serializer.data)


class ListCompanionTripsView(GenericAPIView):
    """
        get:
        Get the list of trips the current user is partaking
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def get(self, request, *args, **kwargs):
        filtered_queryset = self.get_queryset().filter(companions=request.user).order_by('-travel_date')
        serializer = self.get_serializer(filtered_queryset, many=True)
        return Response(serializer.data)


class ListOwnerTripsView(ListAPIView):
    """
        get:
        Get the list of own trips by a user
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.filter(owner=self.kwargs['user_id']).order_by('-rating_avg')


class RetrieveUpdateDeleteTripView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a specific trip by ID and display all the information

        patch:
        Update a specific trip (allowed only for owner or admin)

        delete:
        Delete a specific trip (allowed only for owner or admin)
    """
    # permission_classes = [IsOwnerAdminOrReadOnly, ]
    # permission_classes = [IsLoggedInUserOrStaff]
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    lookup_url_kwarg = 'trip_id'

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass


class ToggleLikeTripView(GenericAPIView):
    """
        post:
        toggle like on a review
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    lookup_url_kwarg = 'trip_id'

    def post(self, request, *args, **kwargs):
        trip = self.get_object()
        user = request.user
        if user in trip.liked_by.all():
            trip.liked_by.remove(user)
        else:
            trip.liked_by.add(user)

            # # create email to review-author
            # mail_instance = EmailScheduler.objects.all()
            # subject = 'Luna-3: your review got liked'
            # message = f'Dear {review.user.username}\n\n' \
            #           f'Your review on {review.restaurant.name} just got a like.\n\n' \
            #           f'So go on, and review other restaurants!\n\n' \
            #           f'See you soon on luna3!'
            # mail_instance.create(subject=subject, message=message, recipient_list=review.user.email)

        return Response(self.get_serializer(trip).data)


class ListOwnedTripsView(generics.ListAPIView):
    """
        get:
        Get the list of the trips the current user owns
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        user = self.request.user
        return user.own_trips.all().order_by('-travel_date')


class ListLikedTripsView(generics.ListAPIView):
    """
        get:
        Get the list of the trips the current user liked
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        user = self.request.user
        return user.liked_trips.all().order_by('-rating_avg', '-travel_date')


class ListReviewedTripsView(generics.ListAPIView):
    """
        get:
        Get the list of the trips the current user has reviewed/rated
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        user = self.request.user
        return user.reviews.trip.all().order_by('-rating_avg', '-travel_date')


class ListFriendsTripsView(ListAPIView):
    """
        get:
        Get the list of trips of the current users friends own
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = Trip.objects.filter(Q(owner__friendrequests_sent__state='A',
                                         owner__friendrequests_sent__receiver=current_user)
                                       | Q(owner__friendrequests_received__state='A',
                                           owner__friendrequests_received__sender=current_user)
                                       ).order_by('-rating_avg', '-travel_date')
        return queryset


filter(
            )