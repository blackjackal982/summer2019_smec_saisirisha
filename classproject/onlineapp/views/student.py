from django.views import View
from onlineapp.models import College, Student, MockTest1

from django.urls import resolve
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from onlineapp.forms import AddStudent, MockTestForm


class AddStudentView(View):
    def get(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            redirect('login_app')

        student_form = AddStudent()
        college = College.objects.get(id=kwargs.get('pk'))
        marks_form = MockTestForm

        if kwargs.get('sk'):
            stu = Student.objects.get(id=kwargs.get('sk'))
            student_form = AddStudent(instance=stu)
            marks = MockTest1.objects.get(student_id=kwargs.get('sk'))
            marks_form = MockTestForm(instance=marks)

        if resolve(request.path_info).url_name == 'delete_student':
            val = kwargs.get('sk')
            Student.objects.get(id=val).delete()
            return redirect('college_details', pk=kwargs.get('pk'))

        return render(
            request,
            template_name='insert_student.html',
            context={'form': student_form,
                     'title': 'Add Student | Mentor App',
                     'clg': college,
                     'marks': marks_form,
                     'permissions': request.user.get_all_permissions(),
                     'authenticated': request.user.is_authenticated,
                     'user': request.user.username,
                     }
        )

    def post(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            redirect('login_app')

        if resolve(request.path_info).url_name == 'edit_student':
            student = Student.objects.get(pk=kwargs.get('sk'))
            marks = MockTest1.objects.get(student_id=kwargs.get('sk'))

            form = AddStudent(request.POST, instance=student)
            marks_form = MockTestForm(request.POST, instance=marks)

            total = int(request.POST['problem1']) + int(request.POST['problem2']) + int(request.POST['problem3']) + \
                    int(request.POST['problem4'])
            marks.total = total

            form.save()
            marks_form.save()

            return redirect('college_details', pk=kwargs.get('pk'))

        else:
            form = AddStudent(request.POST)
            marks_form = MockTestForm(request.POST)

            if form.is_valid() and marks_form.is_valid():
                college = College.objects.get(id=kwargs.get('pk'))
                stu = form.save(commit=False)
                stu.college = college
                stu.save()

                total = int(request.POST['problem1']) + int(request.POST['problem2']) + int(request.POST['problem3']) + \
                    int(request.POST['problem4'])

                marks = marks_form.save(commit=False)
                marks.student = stu
                marks.total = total
                marks.save()

                return redirect('college_details', pk=kwargs.get('pk'))
            else:
                return render(request, template_name='insert_student.html',
                      context={'form': form,
                               'title': 'Add Student | Mentor App',
                               'permissions': request.user.get_all_permissions(),
                               'authenticated': request.user.is_authenticated,
                               'user':request.user.username,
                               })
