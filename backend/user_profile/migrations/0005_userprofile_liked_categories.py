# Generated by Django 4.2.3 on 2023-07-13 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
        ('user_profile', '0004_alter_userprofile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='liked_categories',
            field=models.ManyToManyField(to='category.category'),
        ),
    ]
