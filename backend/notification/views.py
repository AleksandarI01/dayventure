from datetime import datetime

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response

from notification.models import Notification
from notification.serializers import NotificationSerializer


class ListNotificationsView(ListAPIView):
    """
        get:
        List of open notifications for the current user
    """
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(done_date=None, recipient=user).order_by('create_date')


class PatchNotificationView(GenericAPIView):
    """
        patch:
        Mark a Notification as done
    """
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    lookup_url_kwarg = 'note_id'

    def patch(self, request, *args, **kwargs):
        notification = self.get_object()
        notification.done_date = datetime.now()
        notification.save()
        return Response(status=status.HTTP_200_OK)
