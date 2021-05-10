# STT-and-Translation
Web based app for speech to text and translations , using IBM cloud Api , hosted on IBM cloud foundry.
### Flask - Html - Css - Python - Cloudfoundry Api

## Table of Contents
* [Introduction](#introduction)
* [Working](#working)
* [Installation](#installation)
* [References](#references)

## Introduction
This is a Speech-to-Text and Translation Web App, built on python using Flask framework and IBM CLoud APIs.
## Working
Working with IBM Apis:
Taking audio input through browser and without locally saving it passing it to the Speech-to-Text API by first converting the auido stream to bytes stream. The API result is then pass to the Translation module and the result is diplayed.
Implementation Demo screenshots can be found in the [Report.pdf](https://github.com/KUHOO-S/QuizzyWizzy/blob/master/Report.pdf) file

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
