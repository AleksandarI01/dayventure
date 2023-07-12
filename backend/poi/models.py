from django.db import models


class POI(models.Model):
    name = models.CharField(max_length=150)
    # todo: add Google maps stuff

    def __str__(self):
        return f'registration-code : {self.name}'
