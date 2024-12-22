from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# Configure the Google Generative AI with the Gemini API key
api_key = os.getenv('SECRET_KEY')
genai.configure(api_key=api_key)

model = genai.GenerativeModel("models/gemini-1.5-flash")
chat_session = model.start_chat(history=[])

@app.route('/get', methods=['POST'])
def get_response():
    msg = request.form['msg']
    response = chat_session.send_message(msg)
    return jsonify(response=response.text)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run on a different port to avoid conflict with Node.js server