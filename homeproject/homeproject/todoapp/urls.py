from django.urls import include, path
from .views import *
import debug_toolbar

urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path('lists/', get_list),
    path('items/<int:list_id>',get_items),
]