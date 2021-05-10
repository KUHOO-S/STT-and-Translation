# STT-and-Translation
A Speech-to-Text and Translation Web App, built on python using Flask framework and IBM CLoud APIs. It is hosted using IBM Cloudfoundry platform.
### Flask • Html • Css • Js	• Python	• IBM Cloud 	• Cloudfoundry
Taking audio input through browse, passing it to the backend with an AJAX Call. The received audio stream is not saved locally instead is first converted to byte stream and the given to Speech-to-Text module. The API result is then passed to the Translation module and the result is displayed.

## Installation

1. Clone the repo
```sh
git clone https://github.com/KUHOO-S/STT-and-Translation.git
cd STT-and-Translation
```
2. Install all requirements
```sh
python3 -r requirements.txt
```
3. Create a .env file and add all credentials to access the APIs. Refer [IBM API docs](https://cloud.ibm.com/docs)
4. Setup and Run the flask app
```sh
export FLASK_APP=index.py
flask run
```
## References
1. Flask docs - https://flask.palletsprojects.com/en/1.1.x/ 
2. IBM Cloud - https://cloud.ibm.com/docs
