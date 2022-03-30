from rest_framework import routers
from .api import BundleViewSet, TimelinesOnlyBundleViewSet

router = routers.DefaultRouter()
router.register('api/bundles', BundleViewSet, 'bundles')
router.register('api/tbundles', TimelinesOnlyBundleViewSet, 'tbundles')

urlpatterns = router.urls
