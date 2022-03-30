# Generated by Django 3.2 on 2021-05-27 18:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('parts', '0004_auto_20210523_1511'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='part',
            name='staff',
        ),
        migrations.AddField(
            model_name='part',
            name='staff',
            field=models.ManyToManyField(blank=True, related_name='parts', to=settings.AUTH_USER_MODEL),
        ),
    ]
