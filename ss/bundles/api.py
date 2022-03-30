from rest_framework import viewsets, permissions
from .serializers import BundleSerializer

# Bundles Viewset


class BundleViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BundleSerializer

    def get_queryset(self):
        return self.request.user.bundles.all()

    def perform_create(self, serializer):
        # correct it later based on the user/part/bundle heirarcy

        all_parts = self.request.user.parts.all()
        # print(all_parts[0].staff.all())
        serializer.save(staff=all_parts[0].staff.all())


# send only under active timelines -

class TimelinesOnlyBundleViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BundleSerializer

    def get_queryset(self):
        return self.request.user.bundles.filter(underTimeline=True)

    def perform_create(self, serializer):
        # correct it later based on the user/part/bundle heirarcy

        all_parts = self.request.user.parts.all()
        # print(all_parts[0].staff.all())
        serializer.save(staff=all_parts[0].staff.all())
