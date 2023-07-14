from django.db import models


class LevelLimit(models.Model):
    level = models.IntegerField()
    min_score = models.IntegerField()

    def __str__(self):
        return f'level {self.level}: min {self.min_score}'
