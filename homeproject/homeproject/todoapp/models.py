from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todolist(models.Model):
    name = models.CharField(max_length=128)
    current = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class todoitem(models.Model):
    description = models.CharField(max_length = 1000)
    due_date = models.DateField(null = True,blank=True)
    completed = models.BooleanField(default=False)
    list = models.ForeignKey('Todolist', on_delete=models.CASCADE)

    def __str__(self):
        return self.description
