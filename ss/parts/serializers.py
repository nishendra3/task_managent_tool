from django.db.models import fields
from rest_framework import serializers
from parts.models import Part
from bundles.serializers import BundleSerializer


# part serializer

class PartSerializer(serializers.ModelSerializer):
    bundles = BundleSerializer(many=True, read_only=True)

    class Meta:
        model = Part
        # fields = '__all__'
        fields = ('id', 'rootPart', 'itemCode', 'itemName', 'vendorCode',
                  'vendorName', 'buyerCode', 'dept', 'bomQty', 'currentSOB', 'staff', 'underProcess', 'bundles')
        extra_kwargs = {'bundles': {'required': False}}
