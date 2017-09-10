# Client Side

npm install

npm run start:dev

http://localhost:9002

# Server Side

## Install face_recognition python library on AWS

conda create --name hackathon python=3.5

source activate hackathon

conda install -c meznom boost-python

conda install -c menpo dlib

export PYTHON_LIBRARIES=/home/ubuntu/anaconda3/envs/hackathon/lib/

pip install face_recognition

## Upload server.py to AWS

scp -i [path_to_your_pem_file] [path_to_iag-hackathon-fr]/ai/api/server.py ubuntu@[your_EC2_public_ip]:/home/ubuntu/fr/

## Start face recognition server on AWS

cd fr

python server.py

# Things To Do

Design a user story & journey

Take photos of people in Hackathon

Run face_recognition to calculate encodings of these photos & store them in a csv

Hook up camera captured image to the API
https://davidwalsh.name/browser-camera
https://davidwalsh.name/convert-canvas-image

Design customer & policy details UI

Plan the demo

(Optional) Write an API in nodejs to return dummy customer & policy data
