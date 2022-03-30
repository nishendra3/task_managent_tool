from rest_framework import routers
from .api import PartViewSet, BPartViewSet

router = routers.DefaultRouter()
router.register('api/parts', PartViewSet, 'parts')
router.register('api/bparts', BPartViewSet, 'bparts')


urlpatterns = router.urls
