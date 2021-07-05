from rest_framework import serializers
from .models import User, List

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username')

class ListSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = List
    fields = ('id', 'user', 'name', 'recurring')