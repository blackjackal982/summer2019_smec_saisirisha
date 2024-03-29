from django.views import View

from django.urls import resolve
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from onlineapp.forms import *
from django.contrib.auth.mixins import LoginRequiredMixin


class CollegeView(View):

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login_app')

        if kwargs:
            college = get_object_or_404(College, **kwargs)
            students = list(college.student_set.order_by("-mocktest1__total"))
            return render(request,
                          template_name='student_info.html',
                          context={'students': students,
                                   'clgName': college.name,
                                   'title': 'Students from {} | Mentor App'.format(college.name),
                                   'permissions': request.user.get_all_permissions(),
                                   'clg': college,
                                   'authenticated': request.user.is_authenticated,
                                   'user': request.user.username,
                                   }
                          )

        colleges = College.objects.all()

        print(request.user.get_all_permissions())
        return render(request,
                      template_name="college.html",
                      context={'colleges': colleges,
                               'title': ' Participating Colleges',
                               'permissions': request.user.get_all_permissions(),
                               'authenticated': request.user.is_authenticated,
                               'user': request.user.username,
                               }
                      )


class AddCollegeView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            return redirect('login_app')

        form = AddCollege()

        if kwargs:
            college = College.objects.get(**kwargs)
            form = AddCollege(instance=college)

        return render(request, template_name='insert_college.html',
                      context={'form': form,
                               'authenticated': request.user.is_authenticated,
                               'user': request.user.username, })

    def post(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            return redirect('login_app')

        if resolve(request.path_info).url_name == 'delete_college':
            College.objects.get(pk=kwargs.get('pk')).delete()
            return HttpResponseRedirect('/colleges')

        if resolve(request.path_info).url_name == 'edit_college':
            college = College.objects.get(pk=kwargs.get('pk'))
            form = AddCollege(request.POST, instance=college)
            if form.is_valid():
                form.save()
                return HttpResponseRedirect('/colleges')

        form = AddCollege(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/colleges')
        else:
            return render(request,
                          template_name='insert_college.html',
                          context={'form': form, 'title': 'Add College | Mentor App',
                                   'errors': form.errors,
                                   'authenticated': request.user.is_authenticated,
                                   'user': request.user.username,
                                   })
