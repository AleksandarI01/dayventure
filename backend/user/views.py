from django.contrib.auth import get_user_model
from django.db.models import Q
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from user.serializers import UserSerializer
from user_profile.models import UserProfile

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
        profiles = UserProfile.objects.all()
        profile_data = request.data
        liked_cat = None
        if 'username' in profile_data:
            del profile_data['username']
        if 'first_name' in profile_data:
            del profile_data['first_name']
        if 'last_name' in profile_data:
            del profile_data['last_name']
        if 'email' in profile_data:
            del profile_data['email']
        if 'liked_categories' in profile_data:
            liked_cat = profile_data['liked_categories']
            del profile_data['liked_categories']
        profiles.update_or_create(user=instance, defaults=profile_data)
        profile = profiles.get(user=instance)
        if liked_cat:
            profile.liked_categories.set(liked_cat)
        return Response(serializer.data)

    # This will set users inactive instead of deleting them. at the moment inactive users are still shown in views!
    # def delete(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     instance.is_active = False
    #     instance.save()
    #     return Response(status=status.HTTP_200_OK)

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
