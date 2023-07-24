from django.db import models


def icon_directory_path(instance, filename):
    return f'icons/transfer/{filename}'


class Transfer(models.Model):
    means = models.CharField(max_length=150)
    gm_option = models.CharField(max_length=50)
    icon = models.ImageField(upload_to=icon_directory_path, blank=True, null=True)

    def __str__(self):
        return f'{self.id}: {self.means} / {self.gm_option}'
