from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('leads.urls')),
    path('', include('accounts.urls')),
    path('', include('parts.urls')),
    path('', include('timelines.urls')),
    path('', include('bundles.urls')),
]
