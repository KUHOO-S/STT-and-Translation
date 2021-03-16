from flask import Flask,abort, redirect, url_for
from flask import request
from flask import render_template
import os
import json
from os.path import join, dirname
from ibm_watson import SpeechToTextV1
from ibm_watson.websocket import RecognizeCallback, AudioSource
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import time
from ibm_watson import LanguageTranslatorV3
from ibm_watson import TextToSpeechV1
lang1=""
lang2=""
import io
app = Flask(__name__, static_url_path='/static')
port = int(os.getenv('PORT', 8000))


#Speech to text
def STTFunc(bff):  
    print("inside STT")
    authenticator = IAMAuthenticator('')
    speech_to_text = SpeechToTextV1(
        authenticator=authenticator
    )
    speech_to_text.set_service_url('')
    speech_recognition_results = speech_to_text.recognize(audio=bff,content_type='audio/wav',).get_result()
    x=speech_recognition_results["results"][0]["alternatives"][0]["transcript"]
    print(speech_recognition_results)
    return x

#Translator
def Translator(lang,y):
    #mymodel=lang1[:2]+'-'+lang[:2]
    mymodel='en-'+lang[:2]
    print(mymodel)
    
    authenticator = IAMAuthenticator('')
    language_translator = LanguageTranslatorV3(
        version='2018-05-01',
        authenticator=authenticator
    )
    language_translator.set_service_url('')
    translation = language_translator.translate(
        text=y,
        model_id=mymodel).get_result()
    print(translation['translations'][0]['translation'])
    return translation['translations'][0]['translation']


#Routes

@app.route("/", methods=['POST', 'GET'])
def index():
        return render_template("index.html")


@app.route("/resultpage",methods=['POST','GET'])
def resultpage():
    if request.method == "POST":
        f = request.files['audio_data']
        # type conversion to bytes.io
        bff=io.BytesIO()
        bff.write(f.read())
        bff.seek(0)
        stt=STTFunc(bff)
    return(stt)



@app.route("/translate",methods=['POST','GET'])
def translate():
    if request.method == "POST":
        lang=request.form['lang']
        txt=request.form['text']
        translated=Translator(lang,txt)
        #return render_template(("resultpage.html"),sentence=translated)
        return(translated)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, debug=True)
