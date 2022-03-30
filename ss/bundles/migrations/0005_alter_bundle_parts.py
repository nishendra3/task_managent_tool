# Generated by Django 3.2 on 2021-05-23 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parts', '0004_auto_20210523_1511'),
        ('bundles', '0004_alter_bundle_parts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bundle',
            name='parts',
            field=models.ManyToManyField(blank=True, null=True, related_name='bundles', to='parts.Part'),
        ),
    ]
