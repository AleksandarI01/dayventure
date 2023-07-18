from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

# from email_scheduler.models import EmailScheduler
from friendrequest.models import Friendrequest
from friendrequest.permissions import CanDeleteFriendRequest, CanUpdateFriendRequest
from friendrequest.serializers import FriendrequestSerializer
from user.serializers import UserSerializer

User = get_user_model()


class FriendsListView(ListAPIView):
    """
        get:
        List all the accepted friends of the current user

    """

    def get_queryset(self):
        current_user = self.request.user
        result = User.objects.filter(
            Q(friendrequests_sent__state='A', friendrequests_sent__receiver=current_user)
            | Q(friendrequests_received__state='A', friendrequests_received__sender=current_user))

        return result

    serializer_class = UserSerializer


class FriendrequestListView(ListAPIView):

    """
        get:
        List all the friend requests

    """
    serializer_class = FriendrequestSerializer

    def get_queryset(self):
        current_user = self.request.user
        result = Friendrequest.objects.filter(state='P', receiver=current_user)
        return result


class FriendrequestPostView(CreateAPIView):
    """
        post:
        Create a new friend request
    """
    queryset = Friendrequest.objects.all()
    serializer_class = FriendrequestSerializer

    def perform_create(self, serializer):
        receiver = get_object_or_404(User, id=self.kwargs['user_id'])
        serializer.save(sender=self.request.user, receiver=receiver)
        # # create email to receiver
        # mail_instance = EmailScheduler.objects.all()
        # message = f'Dear {receiver.username}\n\n{self.request.user.username} wants to be friends!'
        # mail_instance.create(subject='Motion-3: new friend request', message=message, recipient_list=receiver.email)


class FriendrequestGetPatchDeleteView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get a single friends request information based on request id

        delete:
        sending user can only delete his sent friend request.

        patch:
        Received user can only update the status
    """
    queryset = Friendrequest.objects.all()
    serializer_class = FriendrequestSerializer
    permission_classes = [CanDeleteFriendRequest]

    lookup_url_kwarg = 'friendrequest_id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # if request.data['state'] == 'A':
        #     # create email to sender
        #     mail_instance = EmailScheduler.objects.all()
        #     subject = 'Motion-3: You\'ve got a friend!'
        #     message = f'Dear {instance.sending_user.username}\n' \
        #               f'\n{instance.receiving_user.username} has accepted your friend request!'
        #     mail_instance.create(subject=subject, message=message, recipient_list=instance.sending_user.email)
        return Response(serializer.data)

    def get_permissions(self):
        if self.request.method == 'PATCH':
            # Use different permission class for patch request (partial_update)
            return [CanUpdateFriendRequest()]
        return super().get_permissions()

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass
