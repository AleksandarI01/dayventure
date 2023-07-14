from django.urls import path

from trip.views import CreateTripView, ListFriendsTripsView, ListLikedTripsView, ToggleLikeTripView, \
    RetrieveUpdateDeleteTripView, ListOwnerTripsView, ListCompanionTripsView
from itinerary.views import CreateItineraryView, RetrieveUpdateDeleteItineraryView

urlpatterns = [
    path('new/', CreateTripView.as_view()),
    path('<int:trip_id>/', RetrieveUpdateDeleteTripView.as_view()),
    path('<int:trip_id>/itinerary/new/', CreateItineraryView.as_view()),
    path('itinerary/<itinerary_id>/', RetrieveUpdateDeleteItineraryView.as_view()),
    path('togglelike/<int:trip_id>/', ToggleLikeTripView.as_view()),
    path('own/', ListOwnerTripsView.as_view()),
    path('companion/', ListCompanionTripsView.as_view()),
    path('friends/', ListFriendsTripsView.as_view()),
    path('liked/', ListLikedTripsView.as_view()),
    ]
