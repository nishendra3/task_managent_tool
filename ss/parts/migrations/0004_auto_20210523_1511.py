# Generated by Django 3.2 on 2021-05-23 09:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parts', '0003_auto_20210519_2313'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='part',
            name='alternateVendor',
        ),
        migrations.RemoveField(
            model_name='part',
            name='approvalNumber',
        ),
        migrations.RemoveField(
            model_name='part',
            name='approver1',
        ),
        migrations.RemoveField(
            model_name='part',
            name='approver2',
        ),
        migrations.RemoveField(
            model_name='part',
            name='approver3',
        ),
        migrations.RemoveField(
            model_name='part',
            name='sourcingReason',
        ),
    ]
