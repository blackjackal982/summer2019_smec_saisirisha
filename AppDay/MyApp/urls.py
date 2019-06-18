from django.urls import include, path
from MyApp.views import *
import debug_toolbar


urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),

    path('home/season',SeasonView.as_view(),name="home"),
    path('home/season/<int:season>', SeasonView.as_view(), name='home_season'),
    path('home/season/<int:season>/match/<int:match_id>',matchView.as_view(),name='match'),
    path('home/season/<int:season>/points',PointsTableView.as_view(),name='points'),
    path('home/season/<int:season>/team_home/',TeamHomeView.as_view(),name='team_home'),
    path('home/season/<int:season>/team_home/<str:team>',TeamHomeView.as_view(),name='team_home'),

    path('login',LoginView.as_view(),name="login_app"),
    path('logout',logout_user,name="logout_app"),
    path('signup',SignUpView.as_view(),name="signup_app"),
]