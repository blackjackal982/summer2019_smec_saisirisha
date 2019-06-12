from django.urls import include, path
from onlineapp.views import *
import debug_toolbar


urlpatterns = [
   path('__debug__/', include(debug_toolbar.urls)),

   path('colleges/',CollegeView.as_view(),name='college_html'),
   path(r'colleges/<int:pk>/',CollegeView.as_view(),name='college_details'),
   path(r'colleges/<str:acronym>/',CollegeView.as_view(),name='college_details'),

    path(r'college/add',AddCollegeView.as_view(),name="add_colleges"),
    path(r'college/add/<int:pk>/edit_college',AddCollegeView.as_view(),name="edit_college"),
    path(r'college/add/<int:pk>/delete_college',AddCollegeView.as_view(),name="delete_college"),

    path(r'college/add/<int:pk>/add_student',AddStudentView.as_view(),name="add_student"),
    path(r'college/add/<int:pk>/<int:sk>/edit_student',AddStudentView.as_view(),name="edit_student"),
    path(r'college/add/<int:pk>/<int:sk>/delete_student',AddStudentView.as_view(),name="delete_student"),

    path('login',LoginView.as_view(),name="login_app"),
    path('signup',SignUpView.as_view(),name="signup_app"),
    path('logout',logout_user,name="logout_app")


]

