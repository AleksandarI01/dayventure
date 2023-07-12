from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()
    about = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    banner = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()

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

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined',
                  'location', 'about', 'score', 'level', 'avatar', 'banner']
        read_only_fields = ['email', 'date_joined', 'id', 'score', 'level']
