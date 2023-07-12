from django.contrib.auth import get_user_model
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

# from email_scheduler.models import EmailScheduler
from user.serializers import UserSerializer

User = get_user_model()


class RetrieveUpdateDeleteUserView(RetrieveUpdateDestroyAPIView):
    """
        get:
        Get the logged-in user profile

        patch:
        Update the logged-in user profile

        delete:
        Delete the logged-in user profile
    """
    serializer_class = UserSerializer
    lookup_field = None

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # # send mail to user
        # mail_instance = EmailScheduler.objects.all()
        # subject = 'Luna-3: Profile updated'
        # message = f'Dear {self.request.user.username}\n\n' \
        #           f'Your profile on Luna has just been updated.\n' \
        #           f'If this wasn\'t you, reset your password immediately!\n\n' \
        #           f'See you soon on luna3!'
        # mail_instance.create(subject=subject, message=message, recipient_list=self.request.user.email)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_200_OK)

    @swagger_auto_schema(auto_schema=None)
    def put(self, request, *args, **kwargs):
        pass


class RetrieveUsersList(ListAPIView):
    """
        get:
        List all Users
        searchable on username, first_name and last_name with query-parameter 'search'
        EXAMPLE ".../api/users/?search=stefan"
    """
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        search_string = self.request.query_params.get('search', None)
        if search_string is not None:
            queryset = queryset.filter(Q(username__icontains=search_string) |
                                       Q(first_name__icontains=search_string) |
                                       Q(last_name__icontains=search_string))
        return queryset


class RetrieveUserByIDView(RetrieveAPIView):
    """
        get:
        get a specific user profile
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'
