from django.db import models


def category_image_directory_path(instance, filename):
    return f'category/{filename}'


class Category(models.Model):
    name = models.CharField(max_length=150, unique=True)
    icon = models.ImageField(upload_to=category_image_directory_path, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'
