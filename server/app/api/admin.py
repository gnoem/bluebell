from django.contrib import admin
from .models import User, List

admin.site.register([User, List])