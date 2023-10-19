
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.exceptions import NotFound
from .models import TodoItem
from .serializers import TodoItemSerializer
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt

class TodoItemList(generics.ListCreateAPIView):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

class TodoItemDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoItemSerializer

    def get_object(self):
        try:
            return TodoItem.objects.get(pk=self.kwargs['pk'])
        except (TodoItem.DoesNotExist, ValueError):
            raise NotFound()

def index(request):
    return render(request, 'index.html')
