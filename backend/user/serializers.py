from django.contrib.auth import get_user_model
from rest_framework import serializers

from category.serializers import CategorySerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()
    about = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    banner = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()
    liked_categories = serializers.SerializerMethodField()
    trips_count = serializers.SerializerMethodField()
    friends_count = serializers.SerializerMethodField()
    friends_trips_count = serializers.SerializerMethodField()

    def get_location(self, user):
        if hasattr(user, 'user_profile'):
            return user.user_profile.location
        return None

    def get_about(self, user):
        if hasattr(user, 'user_profile'):
            return user.user_profile.about
        return None

    def get_avatar(self, user):
        if hasattr(user, 'user_profile') and user.user_profile.avatar.name != '':
            request = self.context.get("request")
            return request.build_absolute_uri(user.user_profile.avatar.url)
        return None

    def get_banner(self, user):
        if hasattr(user, 'user_profile') and user.user_profile.banner.name != '':
            request = self.context.get("request")
            return request.build_absolute_uri(user.user_profile.banner.url)
        return None

    def get_score(self, user):
        if hasattr(user, 'user_profile'):
            return user.user_profile.score
        return None

    def get_level(self, user):
        if hasattr(user, 'user_profile'):
            return user.user_profile.level
        return None

    def get_liked_categories(self, user):
        if hasattr(user, 'user_profile'):
            return CategorySerializer(user.user_profile.liked_categories, many=True).data
        return None

    def get_trips_count(self, user):
        return user.own_trips.count()

    def get_friends_count(self, user):
        pass

    def get_friends_trips_count(self):
        pass


    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined',
                  'location', 'about', 'score', 'level', 'avatar', 'banner', 'liked_categories']
        read_only_fields = ['email', 'date_joined', 'id', 'score', 'level']
