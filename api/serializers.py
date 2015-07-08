from collections import OrderedDict

from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.urlresolvers import reverse
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import SkipField, empty, set_value
from rest_framework.settings import api_settings

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
        skip_validation_fields = (
            'geolocation',
        )

    def to_internal_value(self, data):
        """
        Dict of native values <- Dict of primitive datatypes.
        """
        print data
        if not isinstance(data, dict):
            message = self.error_messages['invalid'].format(
                datatype=type(data).__name__
            )
            raise ValidationError({
                api_settings.NON_FIELD_ERRORS_KEY: [message]
            })

        ret = OrderedDict()
        errors = OrderedDict()
        fields = [
            field for field in self.fields.values()
            if (not field.read_only) or (field.default is not empty)
        ]

        for field in fields:

            # This feels very wrong, what with having to copy & paste the entire
            # method. At any rate, this conditional block & the
            # 'skip_validation_fields' metaclass property tell the validator we
            # don't really care about unique constraint violations on
            # 'geolocation'. This is because
            if field.field_name in self.Meta.skip_validation_fields:
                set_value(ret, field.source_attrs, field.get_value(data))
                continue

            validate_method = getattr(self, 'validate_' + field.field_name, None)
            primitive_value = field.get_value(data)
            try:
                validated_value = field.run_validation(primitive_value)
                if validate_method is not None:
                    validated_value = validate_method(validated_value)
            except ValidationError as exc:
                errors[field.field_name] = exc.detail
            except DjangoValidationError as exc:
                errors[field.field_name] = list(exc.messages)
            except SkipField:
                pass
            else:
                set_value(ret, field.source_attrs, validated_value)

        if errors:
            raise ValidationError(errors)

        return ret

    def create(self, validated_data):
        print validated_data
        geolocation = validated_data.pop('geolocation')
        loc, _ = models.GeoLocation.objects.get_or_create(**geolocation)
        marker, _ = models.Marker.objects.get_or_create(geolocation=loc,
                                                        **validated_data)

        return marker
