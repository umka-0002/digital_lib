from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
        read_only_fields = ('ocr_text', 'corrected_text', 'checked', 'rejected', 'created_at', 'uploaded_by')