from django.db import models

# Create your models here.
class Todolist(models.Model):
    name = models.CharField(max_length=128)
    current = models.DateTimeField(auto_now_add=True)

    to_do_item = models.ForeignKey('todoitem',on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class todoitem(models.Model):
    decsription = models.CharField(max_length = 1000)
    due_date = models.DateField(null = True,blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.decsription
