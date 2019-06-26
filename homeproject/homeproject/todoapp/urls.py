from django.urls import include, path
from .views import *
from .api_views import *
import debug_toolbar

urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    # path('lists/', get_list),
    # path('items/<int:list_id>',get_items),


    path('login', LoginView.as_view(), name="login_app"),
    path('signup', SignUpView.as_view(), name="signup_app"),
    path('logout', logout_user, name="logout_app"),


    path('lists/',ListView.as_view(),name="list_view"),
    path('lists/<int:pk>/',ListView.as_view(),name="list_items"),


    path('lists/add/',AddListView.as_view(),name="add_list"),
    path('lists/<int:pk>/edit_list',AddListView.as_view(),name="edit_list"),
    path('lists/<int:pk>/delete_list',AddListView.as_view(),name="delete_list"),


    path('lists/<int:pk>/add', AddItemView.as_view(), name="add_item"),
    path('lists/<int:pk>/edit_item/<int:item_id>',AddItemView.as_view(),name="edit_item"),
    path('lists/<int:pk>/delete_item/<int:item_id>',AddItemView.as_view(),name="delete_item"),


    path('api_view/v1/lists',get_lists,name="lists"),
    path('api_view/v1/lists/<int:pk>',get_lists,name="list_by_id"),

    path('api_view/v1/lists/<int:pk>/items/',get_items,name="item_by_id"),
    path('api_view/v1/lists/<int:pk>/items/<int:item_id>',get_items,name="item_by_id"),

    path('api_view/v1/token',generate_token,name="token"),


]