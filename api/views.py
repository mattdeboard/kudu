from rest_framework import status, viewsets
from rest_framework.response import Response

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

    def handle_exception(self, exc):
        print exc
        return super(MarkerViewSet, self).handle_exception(exc)

    def create(self, request, *args, **kwargs):
        response = super(MarkerViewSet, self).create(request, *args, **kwargs)

        if response.has_header('Location'):
            # This indicates the Marker record already existed so we didn't
            # create something new.
            return Response(response.data, status=status.HTTP_202_ACCEPTED,
                            headers={k: v for k, v in response.items()})
        return response

