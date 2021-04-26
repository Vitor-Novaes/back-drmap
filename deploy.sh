#!/bin/bash

aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin http://734146913661.dkr.ecr.us-east-1.amazonaws.com/drm
sudo docker build -t drm_api .
sudo docker tag drm_api:latest 734146913661.dkr.ecr.us-east-1.amazonaws.com/drm:latest
sudo docker push 734146913661.dkr.ecr.us-east-1.amazonaws.com/drm:latest


