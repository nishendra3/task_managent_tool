from django.db import models
from parts.models import Part
from bundles.models import Bundle


class Timeline(models.Model):

    activity = models.CharField(max_length=100)
    startDate = models.DateField(default="2000-01-01")
    endDate = models.DateField(default="2000-01-01")
    actualSD = models.DateField(default="2000-01-01")
    actualED = models.DateField(default="2000-01-01")
    completion = models.IntegerField(default=0)
    order = models.IntegerField(default=0)

    bundle = models.ForeignKey(
        Bundle, related_name='timelines', on_delete=models.CASCADE)
