from todoapp.forms import *
from todoapp.models import *
from django.views import View
from django.urls import resolve
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect

class ListView(View):
    def get(self,request,*args,**kwargs):
        if kwargs:
            list = Todolist.objects.filter(user_id=request.user.id).all()
            items = todoitem.objects.filter(list_id = kwargs.get('pk')).all()
            return render(request,
                          template_name='get_list_items.html',
                          context={
                                   'title': 'List',
                                   'permissions': request.user.get_all_permissions(),
                                   'lists':list,
                                    'items':items,
                                    'user':request.user.username,
                                    'user_id':request.user.id,
                                    'authenticated': request.user.is_authenticated,
                                    'list_id': kwargs.get('pk'),
                                   }
                          )

        list = Todolist.objects.filter(user_id=request.user.id).all()
        return render(request,
                      template_name="get_all_lists.html",
                      context={'lists': list,
                               'title': ' TODO LISTS',
                               'user': request.user.username,
                               'user_id': request.user.id,
                               'permissions': request.user.get_all_permissions(),
                               'authenticated': request.user.is_authenticated,
                               }
                      )

class AddListView(View):
    def get(self, request, *args, **kwargs):
        # render all the list items.
        form = ListForm()

        if kwargs:
            list = Todolist.objects.get(**kwargs)
            form = ListForm(instance=list)

        if resolve(request.path_info).url_name == 'delete_list':
            Todolist.objects.get(pk=kwargs.get('pk')).delete()
            return HttpResponseRedirect('/lists')


        return render(request, template_name='new_list.html',
                      context={'form': form,
                               'authenticated': request.user.is_authenticated,
                               'title': 'ADD LIST | TODOAPP',
                                'user':request.user.username,

                               })

    def post(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            redirect('login_app')


        if resolve(request.path_info).url_name == 'edit_list':
            list= Todolist.objects.get(pk=kwargs.get('pk'))
            form = ListForm(request.POST, instance=list)
            if form.is_valid():
                form.save()
                return redirect('list_view')

        form = ListForm(request.POST)
        if form.is_valid():
            user = User.objects.get(id=request.user.id)
            list = form.save(commit=False)
            list.user = user
            list.save()

            return HttpResponseRedirect('/lists')
        else:
            return render(request, template_name='new_list.html',
                          context={'form': form, 'title': 'Add List | TODO App', 'errors': form.errors,
                                   'authenticated': request.user.is_authenticated})

