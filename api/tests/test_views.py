import json

from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework.test import APIClient

from . import factories
from api import views


class MarkerViewSetTest(TestCase):
    def setUp(self):
        super(MarkerViewSetTest, self).setUp()
        self.list_view = views.MarkerViewSet.as_view({'get': 'list'})
        self.client = APIClient()
        self.user = factories.UserFactory(is_superuser=True, is_staff=True)
        self.token = factories.TokenFactory(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token %s" % self.token.key)

    def test_create(self):
        data = {
            'description': 'test marker',
            'title': 'Test Marker #1',
            'geolocation': {
                'lat': 1.0,
                'lon': 1.1,
                'altitude': 184
            }
        }
        response = self.client.post(reverse('marker-list'), json.dumps(data),
                                    content_type='application/json')
        self.assertEqual(201, response.status_code,
                         "Error Code: %d\nError Message: %s" %
                         (response.status_code, response.data))

