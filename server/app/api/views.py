from rest_framework import viewsets
from .serializers import UserSerializer, ListSerializer
from .models import User, List


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer

class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all().order_by('name')
    serializer_class = ListSerializer