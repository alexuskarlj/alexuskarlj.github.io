from django.contrib import admin
from django.urls import path, include
from todo_app.views import TodoItemList, TodoItemDetail, index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/todos/', TodoItemList.as_view(), name='todo-list'),
    path('api/todos/<int:pk>/', TodoItemDetail.as_view(), name='todo-detail'),
    path('', index, name='index'),
]

