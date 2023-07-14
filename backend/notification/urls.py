from django.urls import path

from notification.views import PatchNotificationView, ListNotificationsView

urlpatterns = [
    path('', ListNotificationsView.as_view()),
    path('<int:note_id>/', PatchNotificationView.as_view()),
    ]
