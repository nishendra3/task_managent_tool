# Generated by Django 3.2 on 2021-05-25 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bundles', '0007_alter_bundle_parts'),
    ]

    operations = [
        migrations.AddField(
            model_name='bundle',
            name='underTimeline',
            field=models.BooleanField(default=False),
        ),
    ]
