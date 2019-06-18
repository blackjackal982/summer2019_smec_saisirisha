from django.views import View

from django.urls import resolve
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from MyApp.models import *
from django.core.paginator import Paginator

class TeamHomeView(View):

    def get(self,request,*args,**kwargs):
        list_of_teams = Match.objects.values_list('team1').distinct()

        if kwargs.get('team'):
            matches1 = Match.objects.filter(season_year=kwargs.get('season')).filter(team1=kwargs.get('team')).all()
            matches2 = Match.objects.filter(season_year=kwargs.get('season')).filter(team2=kwargs.get('team')).all()
            return render(request,
                      template_name='team_home.html',
                      context={
                          'matches':matches1,
                          'teams':list_of_teams,
                          'year':kwargs.get('season'),
                          'authenticated': request.user.is_authenticated,
                          'name': request.user.username,
                           'match':matches2,
                      })
        else:
            return render(request,
                          template_name='team_home.html',
                          context={
                              'teams': list_of_teams,
                              'year':kwargs.get('season'),
                              'authenticated': request.user.is_authenticated,
                              'name': request.user.username,
                          }
                          )

class HomeView(View):
    def get(self,request,*args,**kwargs):
        