# Generated by Django 4.2.3 on 2023-07-21 06:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transfer', '0001_initial'),
        ('trip', '0003_alter_trip_categories'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='default_transfer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='transfer.transfer'),
        ),
        migrations.AddField(
            model_name='trip',
            name='start_time',
            field=models.TimeField(default='08:00'),
        ),
    ]