import os
import numpy as np
import tensorflow as tf
from flask import Flask, render_template, request, redirect, url_for
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

# Initialize Flask App
app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'static/uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load Model
try:
    model = tf.keras.models.load_model("best_model.h5")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_image(img_path):
    if model is None:
        return "Error", 0.0

    # Preprocess image
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Prediction
    prediction = model.predict(img_array)[0][0]  # Sigmoid output (0 to 1)
    
    # Logic: > 0.5 is Normal, <= 0.5 is Abnormal
    if prediction > 0.5:
        label = "Normal"
        # Confidence is the raw prediction probability for Normal
        confidence_percent = round(prediction * 100, 2)
    else:
        label = "Abnormal"
        # Confidence is the inverse prediction probability (how sure it is 'not normal')
        confidence_percent = round((1 - prediction) * 100, 2)
    
    return label, confidence_percent

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    confidence = None
    filepath = None
    filename = None

    if request.method == "POST":
        if 'image' not in request.files:
            return redirect(request.url)
        
        file = request.files['image']
        
        if file.filename == '':
            return redirect(request.url)
            
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # Get Prediction
            result, confidence = predict_image(filepath)
            
            # Pass the relative path for the template
            filepath = f"static/uploads/{filename}"

    return render_template("index.html",
                           result=result,
                           confidence=confidence,
                           filepath=filepath)

if __name__ == "__main__":
    app.run(debug=True, port=5000)