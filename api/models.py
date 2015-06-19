from django.contrib.gis.models.db import models


class GeoLocation(models.Model):
    lon = models.FloatField()
    lat = models.FloatField()
    altitude = models.FloatField()

    mpoly = models.MultiPolygonField()
    objects = models.GeoManager()

    def __str__(self):
        return "<GeoLocation lon=%s lat=%s altitude=%s>" % (
            self.lon, self.lat, self.altitude)

    class Meta:
        unique_together = (
            ('lon', 'lat', 'altitude'),
        )


class Marker(models.Model):
    geolocation = models.ForeignKey(GeoLocation)
    description = models.TextField()
    title = models.TextField()
