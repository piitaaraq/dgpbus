# Generated by Django 5.1 on 2024-09-20 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dgp_bus', '0014_staffadminuser_patient_alter_ride_users_delete_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staffadminuser',
            name='email',
        ),
        migrations.AddField(
            model_name='staffadminuser',
            name='username',
            field=models.CharField(default='ploe@peqqik.gl', max_length=150, unique=True),
            preserve_default=False,
        ),
    ]
