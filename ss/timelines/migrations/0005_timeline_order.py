# Generated by Django 3.2 on 2021-05-26 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timelines', '0004_auto_20210524_1906'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeline',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
