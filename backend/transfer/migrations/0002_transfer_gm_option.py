# Generated by Django 4.2.3 on 2023-07-21 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transfer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='transfer',
            name='gm_option',
            field=models.CharField(default='X', max_length=50),
            preserve_default=False,
        ),
    ]
