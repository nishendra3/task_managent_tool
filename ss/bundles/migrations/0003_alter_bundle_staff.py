# Generated by Django 3.2 on 2021-05-23 16:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bundles', '0002_bundle_bname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bundle',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bundles', to=settings.AUTH_USER_MODEL),
        ),
    ]
