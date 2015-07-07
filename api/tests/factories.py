import factory

from django.conf import settings
from rest_framework.authtoken.models import Token


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = settings.AUTH_USER_MODEL

    username = factory.Sequence(lambda n: 'testuser_%s' % n)
    first_name = 'User'
    last_name = factory.Sequence(lambda n: '%s' % n)
    email = factory.Sequence(lambda n: 'testuser_%s@courseload.com' % n)


class TokenFactory(factory.DjangoModelFactory):
    class Meta:
        model = Token

    user = factory.SubFactory(UserFactory)


