from rest_framework import serializers
from .models import User, List

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username')

class ListSerializer(serializers.ModelSerializer):
  class Meta:
    model = List
    fields = ('id', 'user', 'name', 'recurring')

  def create(self, validated_data):
    list = List.objects.create(**validated_data)
    return list