from timelines.models import Timeline
from rest_framework import viewsets, permissions
from .serializers import TimelineSerializer

# Timeline Viewset


class TimelineViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TimelineSerializer

    def get_queryset(self):
        pk = self.request.GET.get('pk', '')
        bundle = self.request.user.bundles.get(id=pk)
        return bundle.timelines.all().order_by('order')

    # def perform_create(self, serializer):
    #     pk = self.request.GET.get('pk', '')
    #     serializer.save(bundle=self.request.user.bundles.get(pk=pk))
