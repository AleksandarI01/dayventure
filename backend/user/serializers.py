from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import serializers

from category.serializers import CategorySerializer
from trip.models import Trip

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
    sent_friendrequest_state = serializers.SerializerMethodField()
    received_friendrequest_state = serializers.SerializerMethodField()

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
        friends = User.objects.filter(
            Q(friendrequests_sent__state='A', friendrequests_sent__receiver=user)
            | Q(friendrequests_received__state='A', friendrequests_received__sender=user)
        ).distinct()
        return friends.count()

    def get_friends_trips_count(self, user):
        trips = Trip.objects.filter(
            Q(owner__friendrequests_sent__state='A', owner__friendrequests_sent__receiver=user)
            | Q(owner__friendrequests_received__state='A', owner__friendrequests_received__sender=user))
        trips = trips.filter(Q(privacy__in=('E', 'F')) | Q(privacy='P', companions=user)).distinct()
        return trips.count()

    def get_sent_friendrequest_state(self, user):
        if self.context['request'].user.id is None:
            return None
        friendrequest = user.friendrequests_received.filter(sender=self.context['request'].user).first()
        if not friendrequest:
            return None
        return friendrequest.state

    def get_received_friendrequest_state(self, user):
        if self.context['request'].user.id is None:
            return None
        friendrequest = user.friendrequests_sent.filter(receiver=self.context['request'].user).first()
        if not friendrequest:
            return None
        return friendrequest.state

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined',
                  'location', 'about', 'score', 'level', 'avatar', 'banner', 'liked_categories',
                  'trips_count', 'friends_count', 'friends_trips_count',
                  'sent_friendrequest_state', 'received_friendrequest_state']
        read_only_fields = ['email', 'date_joined', 'id', 'score', 'level',
                            'trips_count', 'friends_count', 'friends_trips_count',
                            'sent_friendrequest_state', 'received_friendrequest_state']
