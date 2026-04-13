from PIL import Image 
import base64
import pytesseract
import requests
import io
from io import BytesIO
from flask import Flask 
from flask import request, jsonify
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
@app.route('/getimage', methods=['GET', 'POST'])
def get_text_from_string():
   
    data = request.get_json()
    image_data = base64.b64decode(data['value'])
    img = Image.open(BytesIO(image_data)).convert('L')

    text = pytesseract.image_to_string(img)

    return jsonify({'text': text})

