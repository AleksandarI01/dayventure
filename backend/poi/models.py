from django.db import models


def poi_image_directory_path(instance, filename):
    return f'poi/{instance.id}/{filename}'


class POI(models.Model):
    name = models.CharField(max_length=250)
    gm_place_id = models.CharField(max_length=150)
    address = models.TextField(blank=True)
    lat = models.FloatField()
    lng = models.FloatField()
    gm_category = models.CharField(max_length=50)
    gm_rating = models.FloatField(default=0)
    website = models.TextField(blank=True)
    opening_hours = models.TextField(blank=True)
    image = models.ImageField(upload_to=poi_image_directory_path, blank=True, null=True)
    gm_image = models.TextField(blank=True)

    def __str__(self):
        return f'{self.gm_place_id}: {self.name}'
