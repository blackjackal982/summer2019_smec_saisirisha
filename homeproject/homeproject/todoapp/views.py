from django.shortcuts import render
from django.http import HttpResponse
from .models import *
# Create your views here.

def get_list(request):
    lists = Todolist.objects.all()
    return render(request,'get_all_lists.html',{'lists':lists})

def get_items(request,list_id):
    list = Todolist.objects.get(id = list_id)
    items = todoitem.objects.filter(list = list)
    return render(request,'get_list_items.html',{'items':items,'list':list})