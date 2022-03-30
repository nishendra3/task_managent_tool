from django.db import models
from django.contrib.auth.models import User
from parts.models import Part


class Bundle(models.Model):

    # combined name /bundle name for the selected parts of bundle -

    bname = models.CharField(max_length=500, default='default name')

    # selected parts for selected parts in the bundle -

    parts = models.ManyToManyField(
        Part, related_name="bundles", blank=True)

    # owner of the created bundle -

    staff = models.ManyToManyField(
        User, related_name="bundles", blank=True)

    ## for future approval section ##

    approver1 = models.ForeignKey(
        User, related_name="approvals1", on_delete=models.SET_NULL, null=True, blank=True)
    approver2 = models.ForeignKey(
        User, related_name="approvals2", on_delete=models.SET_NULL, null=True, blank=True)
    approver3 = models.ForeignKey(
        User, related_name="approvals3", on_delete=models.SET_NULL, null=True, blank=True)

    approvalNumber = models.IntegerField(default=0)

    underComment = models.BooleanField(default=False)

    ##

    # alternate vendor details -

    alternateVendorCode = models.CharField(
        max_length=100)
    alternateVendor = models.CharField(max_length=500)
    sourcingReason = models.CharField(max_length=500)

    # additional informations to be captured -

    ringiNumber = models.CharField(max_length=500, null=True, blank=True)
    loiNumber = models.CharField(max_length=500, null=True, blank=True)
    testModel = models.CharField(max_length=500, null=True, blank=True)

    # to check if the bundle has been filled up for timeline gantt view -

    underTimeline = models.BooleanField(default=False)
