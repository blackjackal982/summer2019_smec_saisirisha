from django.views import View
from todoapp.forms import *
from todoapp.models import *

from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect
from django.urls import resolve


class AddItemView(View):

    def get(self, request, *args, **kwargs):
        form = ItemForm()
        if kwargs.get('item_id'):
            item = todoitem.objects.get(id=kwargs.get('item_id'))
            form = ItemForm(instance=item)

        if resolve(request.path_info).url_name == 'delete_item':
            todoitem.objects.get(id=kwargs.get('item_id')).delete()
            return redirect('list_items', pk=kwargs.get('pk'))

        return render(request, template_name="new_item.html",
                      context={'form': form,
                               'authenticated': request.user.is_authenticated,
                               'title': 'ADD ITEM | TODOAPP',
                               'user': request.user.username,
                               })

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            redirect('login_app')

        if resolve(request.path_info).url_name == 'edit_item':
            item = get_object_or_404(todoitem,pk=kwargs.get('item_id'))
            form = ItemForm(request.POST,instance=item)
            form.save()
            return redirect('list_items',pk=kwargs.get('pk'))
        else:
            form = ItemForm(request.POST)

            if form.is_valid():
                list = Todolist.objects.get(id=kwargs.get('pk'))
                item = form.save(commit=False)
                item.list = list
                item.save()

                return redirect('list_items', pk=kwargs.get('pk'))
            else:
                return render(request, template_name='new_item.html',
                              context={'form': form,
                                       'title': 'Add Item | TODO App',
                                       'permissions': request.user.get_all_permissions(),
                                       'authenticated': request.user.is_authenticated,
                                       })
