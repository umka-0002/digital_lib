from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Card
from .serializers import CardSerializer
from cards.tasks import process_card_async

class CardUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]  # или AllowAny для теста

    def post(self, request, format=None):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            card = serializer.save(uploaded_by=request.user)
            # Запуск асинхронного пайплайна
            process_card_async.delay(card.id)
            return Response(CardSerializer(card).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)