# Generated by Django 4.2.3 on 2023-07-19 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poi', '0003_poi_address_poi_gm_category_poi_gm_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='poi',
            name='phone',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
