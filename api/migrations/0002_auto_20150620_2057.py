# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.postgres.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField()),
                ('aliases', django.contrib.postgres.fields.ArrayField(base_field=models.TextField(), size=None)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'customer',
            },
        ),
        migrations.AlterModelTable(
            name='geolocation',
            table='geolocation',
        ),
        migrations.AlterModelTable(
            name='marker',
            table='marker',
        ),
    ]
