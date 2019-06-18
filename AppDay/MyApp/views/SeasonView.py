from django.views import View

from django.urls import resolve
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from MyApp.models import *
from django.core.paginator import Paginator

class SeasonView(View):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        if kwargs:
            season = Match.objects.filter(season_year = kwargs.get('season')).all()
            year = kwargs.get('season')
        else:
            season = Match.objects.filter(season_year = 2019).all()
            year = 2019

        paginator = Paginator(season, 8)  # Show 8 values per page
        page = request.GET.get('page')
        season = paginator.get_page(page)
        return render(request,
                      template_name='home.html',
                      context={
                          'title' : 'Seasons | IPL APP',
                          'seasons': season,
                          'year': year,
                          'authenticated': request.user.is_authenticated,
                          'name': request.user.username,
                      })
