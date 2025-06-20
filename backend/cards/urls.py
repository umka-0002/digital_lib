from django.urls import path
from .views import CardUploadView, CardApproveView, CardRejectView, CardExportView

urlpatterns = [
    path('upload/', CardUploadView.as_view(), name='card-upload'),
    path('approve/<int:pk>/', CardApproveView.as_view(), name='card-approve'),
    path('reject/<int:pk>/', CardRejectView.as_view(), name='card-reject'),
    path('export/', CardExportView.as_view(), name='card-export'),
]