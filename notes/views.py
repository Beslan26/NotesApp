from django.shortcuts import render
from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer


class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class NoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer



def index(request):
    return render(request, 'notes/index.html',)


