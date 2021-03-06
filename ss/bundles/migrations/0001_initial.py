# Generated by Django 3.2 on 2021-05-23 09:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('parts', '0004_auto_20210523_1511'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bundle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approvalNumber', models.IntegerField(default=0)),
                ('underComment', models.BooleanField(default=False)),
                ('alternateVendor', models.CharField(blank=True, max_length=500, null=True)),
                ('sourcingReason', models.CharField(blank=True, max_length=500, null=True)),
                ('approver1', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approvals1', to=settings.AUTH_USER_MODEL)),
                ('approver2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approvals2', to=settings.AUTH_USER_MODEL)),
                ('approver3', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='approvals3', to=settings.AUTH_USER_MODEL)),
                ('parts', models.ManyToManyField(related_name='bundles', to='parts.Part')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bundles', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
