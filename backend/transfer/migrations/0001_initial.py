# Generated by Django 4.2.3 on 2023-07-12 15:32

from django.db import migrations, models
import transfer.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transfer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('means', models.CharField(max_length=150)),
                ('icon', models.ImageField(blank=True, null=True, upload_to=transfer.models.icon_directory_path)),
            ],
        ),
    ]