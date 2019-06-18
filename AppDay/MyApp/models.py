from django.db import models

# Create your models here.


class Match(models.Model):
    match_id = models.IntegerField(unique=True)
    season_year = models.IntegerField(null=True)
    match_city = models.CharField(max_length=100,null=True)
    match_date = models.DateField(null=True)
    team1 = models.CharField(max_length=100,null=True)
    team2 = models.CharField(max_length=100,null=True)
    toss_winner = models.CharField(max_length=100,null=True)
    toss_decision = models.CharField(max_length=100,null=True)
    result = models.CharField(max_length=100,null=True)
    dl_applied = models.BooleanField()
    winner = models.CharField(max_length=100,null=True)
    win_by_run = models.IntegerField(null=True)
    win_by_wicket = models.IntegerField(null=True)
    player = models.CharField(max_length=100,null=True)
    venue = models.CharField(max_length=120,null=True)
    umpire1 = models.CharField(max_length=100,null=True)
    umpire2 = models.CharField(max_length=100,null=True)
    umpire3 =  models.CharField(max_length=100,null=True)

class Balls(models.Model):
    match_id= models.ForeignKey('Match',on_delete=models.CASCADE,to_field='match_id')
    innings = models.IntegerField(null=True)
    batting_team = models.CharField(max_length=100,null=True)
    bowling_team = models.CharField(max_length=100,null=True)
    over = models.IntegerField(null=True)
    ball=models.IntegerField(null=True)
    batsman = models.CharField(max_length=100,null=True)
    non_striker = models.CharField(max_length=100,null=True)
    bowler = models.CharField(max_length=100,null=True)
    is_super_over = models.BooleanField(null=True)
    wide_runs = models.IntegerField(null=True)
    bye_runs = models.IntegerField(null=True)
    legbye_runs = models.IntegerField(null=True)
    noball_runs = models.IntegerField(null=True)
    penalty_runs = models.IntegerField(null=True)
    batsman_runs = models.IntegerField(null=True)
    extra_runs = models.IntegerField(null=True)
    total_runs = models.IntegerField(null=True)
    player_dismissal = models.CharField(max_length=100,null=True)
    dismissal_kind = models.CharField(max_length=100,null=True)
    fielder = models.CharField(max_length=100,null=True)


