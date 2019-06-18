from django.views import View
from MyApp.forms import LoginForm, SignUpForm

from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect,HttpResponse



def logout_user(request):
    logout(request)
    return HttpResponseRedirect('/login')

class LoginView(View):
    def get(self, request, *args, **kwargs):

        if request.user.is_authenticated:
            return redirect('home')

        form = LoginForm()
        return render(request,
                      template_name='login.html',
                      context={
                          'title': 'Login | IPL App',
                          'form': form,
                          'authenticated':request.user.is_authenticated
                      })

    def post(self, request, *args, **kwargs):
        form = LoginForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
               return HttpResponse(messages.error(request,"Invalid Credentials"))


class SignUpView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('home')

        form = SignUpForm()
        return render(request, template_name='signup.html', context={
            'title': 'Sign Up | IPL App',
            'form': form,
            'authenticated': request.user.is_authenticated
        })

    def post(self,request):
        form = SignUpForm(request.POST)

        if form.is_valid():
            user = User.objects.create_user(**form.cleaned_data)
            login(request,user)
            return redirect('/login')