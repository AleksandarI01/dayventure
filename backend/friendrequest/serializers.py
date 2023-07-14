from rest_framework import serializers
from friendrequest.models import Friendrequest
from user.serializers import UserSerializer


class FriendrequestSerializer(serializers.ModelSerializer):
    sending_user = UserSerializer(read_only=True)
    receiving_user = UserSerializer(read_only=True)

    class Meta:
        model = Friendrequest
        fields = '__all__'
        read_only_fields = ['sender', 'receiver']

    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        post = super().create(validated_data=validated_data)
        return post
