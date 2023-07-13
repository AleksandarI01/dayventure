from django.urls import path

from trip.views import CreateTripView
from itinerary.views import CreateItineraryView

urlpatterns = [
    path('new/', CreateTripView.as_view()),
    path('<int:trip_id>/itinerary/new/', CreateItineraryView.as_view()),
    ]
