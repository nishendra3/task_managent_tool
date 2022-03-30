# Generated by Django 3.2 on 2021-05-27 19:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bundles', '0008_bundle_undertimeline'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bundle',
            name='staff',
        ),
        migrations.AddField(
            model_name='bundle',
            name='staff',
            field=models.ManyToManyField(blank=True, related_name='bundles', to=settings.AUTH_USER_MODEL),
        ),
    ]