from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api/todos/', views.TodoItemList.as_view(), name='todo-list'),
    re_path(r'api/todos/(?P<pk>[0-9a-f-]+)/', views.TodoItemDetail.as_view(), name='todo-detail'),
    path('', TemplateView.as_view(template_name='index.html')),
]
