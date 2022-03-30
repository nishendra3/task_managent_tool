from rest_framework import serializers
from timelines.models import Timeline


# timeline serializer

class TimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeline
        fields = '__all__'
