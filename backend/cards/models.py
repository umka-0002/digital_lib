from django.db import models

class Card(models.Model):
    author = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    year = models.CharField(max_length=10, blank=True)
    city = models.CharField(max_length=128, blank=True)
    pages = models.CharField(max_length=32, blank=True)
    cipher = models.CharField(max_length=64, blank=True)
    # путь к картинке и результаты оцифровки
    image = models.ImageField(upload_to='cards/')
    ocr_text = models.TextField(blank=True)
    corrected_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    checked = models.BooleanField(default=False)  # модерация
    rejected = models.BooleanField(default=False)
    # кто загрузил
    uploaded_by = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.year})"