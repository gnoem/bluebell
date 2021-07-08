from rest_framework import serializers
from .models import User, List

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username')

class ListSerializer(serializers.ModelSerializer):
  class Meta:
    model = List
    fields = ('id', 'user', 'name', 'recurring', 'members')

  def create(self, validated_data):
    list = List.objects.create(**validated_data)
    return list
  
  def update(self, instance, data):
    instance.name = data.get('name', instance.name)
    instance.recurring = data.get('recurring', instance.recurring)
    instance.members = data.get('members', instance.members)
    list = instance
    list.save()
    return list
