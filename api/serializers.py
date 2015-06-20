from rest_framework import serializers

from api import models


class GeoLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.GeoLocation
        fields = (
            'lon',
            'lat',
            'altitude'
        )


class MarkerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Marker
        fields = (
            'geolocation',
            'description',
            'title'
        )
