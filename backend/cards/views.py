from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status, permissions
from .models import Card
from .serializers import CardSerializer
from django.http import HttpResponse
import csv

class CardUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CardApproveView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        card = Card.objects.get(pk=pk)
        card.checked = True
        card.rejected = False
        card.save()
        return Response({'status': 'approved'}, status=status.HTTP_200_OK)

class CardRejectView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        card = Card.objects.get(pk=pk)
        card.checked = False
        card.rejected = True
        card.save()
        return Response({'status': 'rejected'}, status=status.HTTP_200_OK)

class CardExportView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        # Можно добавить фильтры, например экспорт только проверенных карточек
        cards = Card.objects.filter(checked=True)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="cards_export.csv"'
        writer = csv.writer(response)
        writer.writerow(['Автор', 'Название', 'Год', 'Город', 'Страницы', 'Шифр', 'AI-текст', 'Путь к изображению'])
        for card in cards:
            writer.writerow([
                card.author,
                card.title,
                card.year,
                card.city,
                card.pages,
                card.cipher,
                card.corrected_text,
                card.image.url if card.image else ""
            ])
        return response


class CardListView(ListAPIView):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Card.objects.all()
        checked = self.request.query_params.get('checked')
        rejected = self.request.query_params.get('rejected')
        if checked is not None:
            queryset = queryset.filter(checked=checked.lower() == "true")
        if rejected is not None:
            queryset = queryset.filter(rejected=rejected.lower() == "true")
        return queryset