from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Part


class PartResource(resources.ModelResource):

    class Meta:
        model = Part
        fields = ('id', 'rootPart', 'itemCode', 'itemName', 'vendorCode',
                  'vendorName', 'buyerCode', 'dept', 'bomQty', 'currentSOB', 'staff')
        # skip_unchanged = True
        # report_skipped = True
        #exclude = ('id',)


class PartAdmin(ImportExportModelAdmin):
    resource_class = PartResource


# Register your models here.
admin.site.register(Part, PartAdmin)
