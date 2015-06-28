from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField


__all__ = [
    'Customer',
    'GeoLocation',
    'Marker'
]


class Customer(models.Model):
    name = models.TextField()
    aliases = ArrayField(models.TextField())
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'customer'


class GeoLocation(models.Model):
    lon = models.FloatField()
    lat = models.FloatField()
    altitude = models.FloatField()

    objects = models.GeoManager()

    def __str__(self):
        return "<GeoLocation lon=%s lat=%s altitude=%s>" % (
    self.lon, self.lat, self.altitude)

    class Meta:
        unique_together = (
            ('lon', 'lat', 'altitude'),
        )
        db_table = 'geolocation'


class Marker(models.Model):
    geolocation = models.ForeignKey(GeoLocation)
    description = models.TextField()
    title = models.TextField()

    class Meta:
        db_table = 'marker'
