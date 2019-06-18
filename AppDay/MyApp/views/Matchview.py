from django.views import View

from django.urls import resolve
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from MyApp.models import *
from django.db.models import *
from django.core.paginator import Paginator
import operator

class matchView(View):
    def get(self, request, *args, **kwargs):

        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        if kwargs:
            season = Match.objects.filter(match_id = kwargs.get('match_id')).get()
            match_details = Balls.objects.filter(match_id_id=kwargs.get('match_id')).all()

            team1 = [match_details[0].batting_team.lower(),{},{},0,0]
            team2 = [match_details[0].bowling_team.lower(),{},{},0,0]

            for i in match_details:

                if i.batting_team.lower() == team1[0]:
                    team1[3] += i.extra_runs
                    team1[4] += i.total_runs
                    if i.batsman.lower() not in team1[1]:
                        team1[1][i.batsman.lower()]=i.batsman_runs
                    else:
                        team1[1][i.batsman.lower()]+=i.batsman_runs

                elif i.batting_team.lower() == team2[0]:
                    team2[3] += i.extra_runs
                    team2[4] += i.total_runs
                    if i.batsman.lower() not in team2[1]:
                        team2[1][i.batsman.lower()]=i.batsman_runs
                    else:
                        team2[1][i.batsman.lower()]+=i.batsman_runs


            top_scorer_team1 = sorted(team1[1].items(),key=operator.itemgetter(1),reverse=True)[:3]
            top_scorer_team2 = sorted(team2[1].items(),key=operator.itemgetter(1),reverse=True)[:3]


            page = request.GET.get('page')
            if page is None:
                page = '1'
            if page=='1':
                innings1 = match_details.filter(innings=1).all()
                top_wickets_team1 = innings1.values_list('bowler').annotate(count=Count('dismissal_kind')).order_by(
                    '-count').exclude(dismissal_kind__exact='none')[:3]
                return render(
                    request,
                    template_name='match.html',
                    context={
                        'title' : 'Matches | IPL APP',
                        'top_scorer': top_scorer_team1,
                        'match': innings1,
                        'season':season,
                        'number':1,
                        'top_wickets_team':top_wickets_team1,
                        'team1_obj':team1,
                        'team2_obj':team2,
                        'authenticated':request.user.is_authenticated,
                        'name':request.user.username
                    }
                )

            else:
                innings2 = match_details.filter(innings=2).all()
                top_wickets_team1 = innings2.values_list('bowler').annotate(count=Count('dismissal_kind')).order_by(
                    '-count').exclude(dismissal_kind__exact='none')[:3]
                return render(
                    request,
                    template_name='match.html',
                    context={
                        'title' : 'Matches | IPL APP',
                        'top_scorer': top_scorer_team2,
                        'match':innings2,
                        'season':season,
                        'number': 2,
                        'top_wickets_team':top_wickets_team1,
                        'team2_obj': team2,
                        'team1_obj':team1,
                        'authenticated': request.user.is_authenticated,
                        'name': request.user.username
                        }
                )

class PointsTableView(View):
    def get(self,request,*args,**kwargs):
        if kwargs:
            season = Match.objects.filter(season_year = kwargs.get('season')).values_list('winner').annotate(Count('winner')).order_by('-winner__count')
            year = kwargs.get('season')

        paginator = Paginator(season, 8)  # Show 8 values per page
        page = request.GET.get('page')
        season = paginator.get_page(page)
        return render(request,
                      template_name='points_table.html',
                      context={
                          'title' : 'Points Table | IPL APP',
                          'points': season,
                          'year': year,
                          'authenticated': request.user.is_authenticated,
                          'name': request.user.username,
                      })
