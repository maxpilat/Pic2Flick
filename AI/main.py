# загрузка необходимых библиотек
from huggingface_hub import hf_hub_download
from ultralytics import YOLO
from supervision import Detections
from PIL import Image
import numpy as np
from transformers import pipeline

# загрузка модели
model_path = hf_hub_download(repo_id="arnabdhar/YOLOv8-Face-Detection", filename="model.pt")
model = YOLO(model_path)

# выполнение инференса
image_path = "percy_jackson.jpg"
image = Image.open(image_path)
output = model(image)
results = Detections.from_ultralytics(output[0])

# отладочный вывод
print("Raw results:", results.xyxy)  # Выводим сырые результаты


# Вырезаем и сохраняем изображения по координатам
for i in range(len(results.xyxy)):
    xmin = int(results.xyxy[i][0])
    ymin = int(results.xyxy[i][1])
    xmax = int(results.xyxy[i][2])
    ymax = int(results.xyxy[i][3])

    # Вырезаем лицо
    face_image = image.crop((xmin, ymin, xmax, ymax))

    # Сохраняем вырезанное изображение
    face_image.save(f"faces/face_{i}.jpg")


# Определяем человека
pipe = pipeline("image-classification", model="tonyassi/celebrity-classifier")
result = pipe('faces/face_2.jpg')
print(result)
