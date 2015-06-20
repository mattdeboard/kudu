from rest_framework import viewsets

from api import models
from api import serializers

__all__ = [
    'GeoLocationViewSet',
    'MarkerViewSet'
]


class GeoLocationViewSet(viewsets.ModelViewSet):
    queryset = models.GeoLocation.objects.all()
    serializer_class = serializers.GeoLocationSerializer


class MarkerViewSet(viewsets.ModelViewSet):
    queryset = models.Marker.objects.all()
    serializer_class = serializers.MarkerSerializer
