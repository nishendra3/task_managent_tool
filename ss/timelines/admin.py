#from import_export import resources
#from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import Timeline


# class TimelineResource(resources.ModelResource):

#     class Meta:
#         model = Timeline
#         fields = ('activity', 'startDate', 'endDate', 'completion',)
#     skip_unchanged = True
#     report_skipped = True
#     exclude = ('id',)


# class TimelineAdmin(ImportExportModelAdmin):
#     resource_class = TimelineResource


# Register your models here.
#admin.site.register(Timeline, TimelineAdmin)
admin.site.register(Timeline)
