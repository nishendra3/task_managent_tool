from rest_framework import viewsets, permissions
from .serializers import PartSerializer


# Part Viewset


class PartViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PartSerializer

    def get_queryset(self):
        return self.request.user.parts.all()


# Viewset for parts under a specific bundle -


class BPartViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PartSerializer

    def get_queryset(self):
        pk = self.request.GET.get('pk', '')
        bparts = self.request.user.parts.filter(bundles__id=pk)
        return bparts
