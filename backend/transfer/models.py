from django.db import models


def icon_directory_path(instance, filename):
    return f'icons/transfer/{filename}'


class Transfer(models.Model):
    means = models.CharField(max_length=150)
    icon = models.ImageField(upload_to=icon_directory_path, blank=True, null=True)
    # todo: add Google maps stuff

    def __str__(self):
        return f'registration-code : {self.means}'
