from django.db import models

from django.contrib.auth import get_user_model

from category.models import Category

User = get_user_model()


def trip_image_directory_path(instance, filename):
    return f'trip/{instance.id}/{filename}'


PRIVACY_CHOICES = [
    ('P', 'private'),
    ('F', 'friends'),
    ('E', 'everybody'),
]
STATUS_CHOICES = [
    ('P', 'Planning'),
    ('C', 'Cancelled'),
    ('O', 'Ongoing'),
    ('A', 'Absolved'),
]


class Trip(models.Model):
    name = models.CharField(max_length=150)
    owner = models.ForeignKey(to=User, related_name='own_trips', on_delete=models.CASCADE)
    companions = models.ManyToManyField(to=User, related_name='trips', blank=True)
    location = models.CharField(max_length=250)
    travel_date = models.DateField()
    total_cost = models.FloatField(default=0.0)
    cost_currency = models.CharField(max_length=3, default='CHF')
    categories = models.ManyToManyField(to=Category)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default='P')
    privacy = models.CharField(max_length=2, choices=PRIVACY_CHOICES, default='P')
    parent_trip = models.ForeignKey(to='Trip', related_name='child_trips', blank=True, null=True,
                                    default=None, on_delete=models.SET_DEFAULT)
    trip_image = models.ImageField(upload_to=trip_image_directory_path, blank=True, null=True)
    map_image = models.ImageField(upload_to=trip_image_directory_path, blank=True, null=True)
    rating_avg = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)
    liked_by = models.ManyToManyField(to=User, related_name='liked_trips', blank=True)
    create_date = models.DateTimeField(auto_now_add=True)
    mutation_date = models.DateTimeField(auto_now=True)

    def update_rating_fields(self):
        reviews = self.reviews.all()
        self.rating_avg = reviews.aggregate(models.Avg('rating')).get('rating__avg')
        self.review_count = reviews.count()
        self.save(update_fields=['rating_avg', 'review_count'])

    def __str__(self):
        return f'{self.id}: {self.name}'
