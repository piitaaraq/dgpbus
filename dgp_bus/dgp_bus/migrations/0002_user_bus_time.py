# Generated by Django 5.1 on 2024-09-02 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dgp_bus', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='bus_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
