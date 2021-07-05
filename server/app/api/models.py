from django.db import models

class User(models.Model):
  username = models.CharField(max_length=60)
  def __str__(self):
    return self.username

class List(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=60)
  recurring = models.CharField(max_length=60)
  listItems = models.CharField

  def __str__(self):
    return self.name