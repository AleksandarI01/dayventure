# from django.shortcuts import render
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, CreateAPIView
from rest_framework.response import Response

from email_scheduler.models import EmailScheduler
from trip.models import Trip
from trip.serializers import TripSerializer

User = get_user_model()


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
        Get the list of trips a user is partaking
    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
                                                                                            # todo: start work here!!!!!
    def get(self, request, *args, **kwargs):
        filtered_queryset = self.get_queryset().filter(restaurant=self.kwargs["restaurant_id"])
        serializer = self.get_serializer(filtered_queryset, many=True)
        if serializer.data:
            return Response(serializer.data)
        else:
            return Response(data={"error": "restaurant has no reviews yet or does not exist"}, status=404)


class ListOwnerTripsView(ListAPIView):
    """
        get:
        Get the list of own trips by a single user
    """
    serializer_class = TripSerializer

    def get_queryset(self):
        return Trip.objects.filter(owner=self.kwargs['user_id'])


class ListReviewByRestaurantIdView(GenericAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

    def get(self, request, *args, **kwargs):
        if self.kwargs:
            queryset = self.get_queryset().filter(user=self.kwargs['user_id'])
        else:
            queryset = self.get_queryset().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class RetrieveUpdateDeleteReviewsView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a specific review by ID and display all the information

        patch:
        Update a specific review (allowed only for owner or admin)

        delete:
        Delete a specific review (allowed only for owner or admin)
    """
    permission_classes = [IsOwnerAdminOrReadOnly, ]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_url_kwarg = 'review_id'

    # permission_classes = [IsLoggedInUserOrStaff]

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass


class ToggleLikeReview(GenericAPIView):
    """
        post:
        toggle like on a review
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_url_kwarg = 'review_id'

    def post(self, request, *args, **kwargs):
        review = self.get_object()
        user = request.user
        if user in review.liked_by.all():
            review.liked_by.remove(user)
        else:
            review.liked_by.add(user)

            # create email to review-author
            mail_instance = EmailScheduler.objects.all()
            subject = 'Luna-3: your review got liked'
            message = f'Dear {review.user.username}\n\n' \
                      f'Your review on {review.restaurant.name} just got a like.\n\n' \
                      f'So go on, and review other restaurants!\n\n' \
                      f'See you soon on luna3!'
            mail_instance.create(subject=subject, message=message, recipient_list=review.user.email)

        return Response(self.get_serializer(review).data)


class ListLikedReviews(generics.ListAPIView):
    """
        get:
        Get the list of the reviews the current user liked
    """
    serializer_class = ReviewSerializer
    # queryset = Review.objects.all()

    def get_queryset(self):
        user = self.request.user
        return user.likes.all()


class ListCommentedReviews(ListAPIView):
    """
        get:
        Get the list of the reviews the current user commented
    """
    serializer_class = ReviewSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Review.objects.filter(comments__user=user)
        return queryset
