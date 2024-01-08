from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note        # Указывается модель, которую нужно сериализовать
        fields = '__all__'