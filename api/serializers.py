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
    geolocation = GeoLocationSerializer()

    class Meta:
        model = models.Marker
        fields = (
            'geolocation',
            'description',
            'title'
        )

    def create(self, validated_data):
        geolocation = validated_data.pop('geolocation')
        loc, _ = models.GeoLocation.objects.get_or_create(**geolocation)
        return models.Marker.objects.create(geolocation=loc, **validated_data)
