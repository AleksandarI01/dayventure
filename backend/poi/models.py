from django.db import models


def poi_image_directory_path(instance, filename):
    return f'poi/{filename}'


class POI(models.Model):
    name = models.CharField(max_length=150)
    image = models.ImageField(upload_to=poi_image_directory_path, blank=True, null=True)
    # todo: add Google Maps stuff

    def __str__(self):
        return f'registration-code : {self.name}'
