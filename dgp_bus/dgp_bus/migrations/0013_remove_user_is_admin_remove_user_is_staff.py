# Generated by Django 5.1 on 2024-09-19 19:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dgp_bus', '0012_user_is_admin_user_is_staff_user_last_login_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_admin',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_staff',
        ),
    ]
