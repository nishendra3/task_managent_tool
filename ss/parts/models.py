from django.db import models
from django.contrib.auth.models import User


class Part(models.Model):

    rootPart = models.CharField(max_length=100)
    buyerCode = models.CharField(max_length=100)
    itemCode = models.CharField(max_length=100)
    itemName = models.CharField(max_length=500)
    vendorCode = models.CharField(max_length=100)
    vendorName = models.CharField(max_length=500)
    #currentBasicCost = models.FloatField(default=0, null=True, blank=True)
    dept = models.CharField(max_length=10)
    bomQty = models.FloatField(default=0, null=True, blank=True)
    currentSOB = models.FloatField(default=0, null=True, blank=True)

    # staff = models.ForeignKey(
    #     User, related_name="parts", on_delete=models.SET_NULL, null=True)

    staff = models.ManyToManyField(User, related_name="parts", blank=True)

    underProcess = models.BooleanField(default=False)
