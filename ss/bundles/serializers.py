from rest_framework import serializers
from bundles.models import Bundle
from timelines.serializers import TimelineSerializer


class BundleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bundle
        fields = ('id', 'bname', 'parts', 'staff', 'alternateVendorCode',
                  'alternateVendor', 'sourcingReason', 'timelines',
                  'ringiNumber', 'loiNumber', 'testModel', 'underTimeline')
        extra_kwargs = {'timelines': {'required': False}}
