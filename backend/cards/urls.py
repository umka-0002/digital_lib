from django.urls import path
from .views import CardUploadView

urlpatterns = [
    path('upload/', CardUploadView.as_view(), name='card-upload'),
]