from rest_framework import routers
from .api import TimelineViewSet

router = routers.DefaultRouter()
router.register('api/timelines', TimelineViewSet, 'timelines')

urlpatterns = router.urls
