from django.urls import path
from .views import RegisterView, RegisterValidationView

urlpatterns = [

    path('', RegisterView.as_view(), name='register'),
    path('validate/', RegisterValidationView.as_view(), name='register'),
]
