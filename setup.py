#for running the Python app on Bluemix via IBM Cloudfoundry

from setuptools import setup, find_packages
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='GoodTranslations.com',
    version='1.0.0',
    description='Run app on Bluemix',
    long_description=long_description,
    url='https://github.com/KUHOO-S/STT-and-Translation',
    license='Apache-2.0'
)
