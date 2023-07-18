from django.contrib.auth import get_user_model
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, CreateAPIView
from rest_framework.response import Response

# from email_scheduler.models import EmailScheduler
from trip.models import Trip
from trip.serializers import TripSerializer
from user.serializers import UserSerializer

User = get_user_model()


class ListTripsView(ListAPIView):
    """
        get:
        List Trips in order of their rating
        all for /api/trips/
        top 6 for /api/home/
        may be filtered by query_param 'category'
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        current_user = self.request.user
        filter_category = self.request.query_params.get('category', None)
        queryset = Trip.objects.all().order_by('-rating_avg')
        if current_user.id is not None:
            queryset = queryset.filter(Q(privacy='E')
                                       | Q(privacy='F',
                                           owner__friendrequests_sent__state='A',
                                           owner__friendrequests_sent__receiver=current_user)
                                       | Q(privacy='F',
                                           owner__friendrequests_received__state='A',
                                           owner__friendrequests_received__sender=current_user)
                                       | Q(privacy__in=('P', 'F'), companions=current_user)
                                       | Q(privacy__in=('P', 'F'), owner=current_user)
                                       ).distinct()
        else:
            queryset = queryset.filter(privacy='E').distinct()
        if filter_category is not None:
            queryset = queryset.filter(categories__name=filter_category)
        if self.request._request.path == '/api/home/':
            queryset = queryset[:6]
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


class RemoveTripCompanionView(GenericAPIView):
    """
        patch:
        Remove the current user from the list of companions
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    lookup_url_kwarg = 'trip_id'

    def patch(self, request, *args, **kwargs):
        trip = self.get_object()
        current_user = request.user
        if current_user in trip.companions.all():
            trip.companions.remove(current_user)
        return Response(status=status.HTTP_200_OK)


class ListOwnerTripsView(ListAPIView):
    """
        get:
        Get the list of own trips by a user
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = Trip.objects.filter(owner=self.kwargs['user_id']).order_by('-rating_avg')
        if current_user.id is not None:
            queryset = queryset.filter(Q(privacy='E')
                                       | Q(privacy='F',
                                           owner__friendrequests_sent__state='A',
                                           owner__friendrequests_sent__receiver=current_user)
                                       | Q(privacy='F',
                                           owner__friendrequests_received__state='A',
                                           owner__friendrequests_received__sender=current_user)
                                       | Q(privacy__in=('P', 'F'), companions=current_user)
                                       | Q(privacy__in=('P', 'F'), owner=current_user)
                                       ).distinct()
        else:
            queryset = queryset.filter(privacy='E').distinct()
        return queryset


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
    queryset = Trip.objects.all()                 # todo: check if user is allowed by privacy?
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
    lookup_url_kwarg = 'trip_id'                 # todo: check if user is allowed by privacy?

    def post(self, request, *args, **kwargs):
        trip = self.get_object()
        current_user = request.user
        if current_user in trip.liked_by.all():
            trip.liked_by.remove(current_user)
        else:
            trip.liked_by.add(current_user)

            # # create email to review-author
            # mail_instance = EmailScheduler.objects.all()
            # subject = 'Luna-3: your review got liked'
            # message = f'Dear {review.user.username}\n\n' \
            #           f'Your review on {review.restaurant.name} just got a like.\n\n' \
            #           f'So go on, and review other restaurants!\n\n' \
            #           f'See you soon on luna3!'
            # mail_instance.create(subject=subject, message=message, recipient_list=review.user.email)

        return Response(self.get_serializer(trip).data)


class ListOwnedTripsView(ListAPIView):
    """
        get:
        Get the list of the trips the current user owns
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        current_user = self.request.user
        return current_user.own_trips.all().order_by('-travel_date')


class ListLikedTripsView(ListAPIView):
    """
        get:
        Get the list of the trips the current user liked
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = current_user.liked_trips.all().order_by('-rating_avg', '-travel_date')
        queryset = queryset.filter(Q(privacy='E')
                                   | Q(privacy='F',
                                       owner__friendrequests_sent__state='A',
                                       owner__friendrequests_sent__receiver=current_user)
                                   | Q(privacy='F',
                                       owner__friendrequests_received__state='A',
                                       owner__friendrequests_received__sender=current_user)
                                   | Q(privacy='P', companions=current_user)
                                   ).distinct()
        return queryset


class ListReviewedTripsView(ListAPIView):
    """
        get:
        Get the list of the trips the current user has reviewed/rated
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        current_user = self.request.user
        queryset = current_user.reviews.trip.all().order_by('-rating_avg', '-travel_date')
        queryset = queryset.filter(Q(privacy='E')
                                   | Q(privacy='F',
                                       owner__friendrequests_sent__state='A',
                                       owner__friendrequests_sent__receiver=current_user)
                                   | Q(privacy='F',
                                       owner__friendrequests_received__state='A',
                                       owner__friendrequests_received__sender=current_user)
                                   | Q(privacy='P', companions=current_user)
                                   ).distinct()
        return queryset


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
        queryset = queryset.filter(Q(privacy__in=('E', 'F'))
                                   | Q(privacy='P', companions=current_user)).distinct()
        return queryset


class GeneralSearchListView(ListAPIView):
    """
        get:
        Search for ‘trips’ or ‘users’
        EXAMPLE - /api/search/?type=trips&search_string=Bern
        additional filter for 'category' on trips
    """

    def get_serializer_class(self):
        search_type = self.request.query_params.get('type', None)
        if search_type == 'trips':
            return TripSerializer
        if search_type == 'users':
            return UserSerializer
        return TripSerializer

    def get_queryset(self):
        search_type = self.request.query_params.get('type', None)
        search_string = self.request.query_params.get('search_string', None)
        search_category = self.request.query_params.get('category', None)
        current_user = self.request.user

        if search_type == 'trips':
            queryset = Trip.objects.all().order_by('-rating_avg')
            if current_user.id is not None:
                queryset = queryset.filter(Q(privacy='E')
                                           | Q(privacy='F',
                                               owner__friendrequests_sent__state='A',
                                               owner__friendrequests_sent__receiver=current_user)
                                           | Q(privacy='F',
                                               owner__friendrequests_received__state='A',
                                               owner__friendrequests_received__sender=current_user)
                                           | Q(privacy__in=('P', 'F'), companions=current_user)
                                           | Q(privacy__in=('P', 'F'), owner=current_user)
                                           ).distinct()
            else:
                queryset = queryset.filter(privacy='E').distinct()
            if search_string is not None:
                queryset = queryset.filter(name__icontains=search_string)
            if search_category is not None:
                queryset = queryset.filter(categories__name=search_category)
            return queryset

        if search_type == 'users':
            queryset = User.objects.all()
            if search_string is not None:
                queryset = queryset.filter(Q(username__icontains=search_string) |
                                           Q(first_name__icontains=search_string) |
                                           Q(last_name__icontains=search_string)
                                           ).distinct()
            return queryset
        return
