from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers

from api import views


router = routers.DefaultRouter()
router.register('geolocations', views.GeoLocationViewSet)
router.register('markers', views.MarkerViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework'))
]
