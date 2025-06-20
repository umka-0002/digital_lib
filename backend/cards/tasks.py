from celery import shared_task
from .models import Card
import pytesseract
from PIL import Image
import requests

@shared_task
def process_card_async(card_id):
    card = Card.objects.get(id=card_id)
    image_path = card.image.path
    # OCR
    img = Image.open(image_path)
    ocr_text = pytesseract.image_to_string(img, lang='rus+eng')
    card.ocr_text = ocr_text.strip()

    # AI коррекция (пример с OpenAI)
    prompt = f"Исправь ошибки OCR и структурируй по полям: Автор, Название, Год, Город, Страницы, Шифр.\n\n{ocr_text}"
    # (Далее — отправка в сервис OpenAI/Deepseek, тут псевдокод)
    # response = openai_request(prompt)
    response = "..."  # Здесь должен быть вызов к API

    card.corrected_text = response
    card.save()