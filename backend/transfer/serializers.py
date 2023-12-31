from rest_framework import serializers

from transfer.models import Transfer


class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = ['id', 'means', 'gm_option', 'icon']
