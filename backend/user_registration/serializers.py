from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['code'] = instance.user_registration.code
        return representation

    class Meta:
        model = User
        fields = ['email', 'username']


class UserRegistrationValidationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['code'] = instance.user_registration.code
        return representation

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name']
