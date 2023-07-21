# Generated by Django 4.2.3 on 2023-07-21 06:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('itinerary', '0004_remove_itinerary_start_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itinerary',
            name='transfer_duration',
            field=models.DurationField(default=datetime.timedelta(0)),
        ),
    ]
