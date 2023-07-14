# Generated by Django 4.2.3 on 2023-07-14 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='status',
            field=models.CharField(choices=[('P', 'Planning'), ('C', 'Cancelled'), ('O', 'Ongoing'), ('A', 'Absolved')], default='P', max_length=2),
        ),
    ]
