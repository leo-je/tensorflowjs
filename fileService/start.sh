#! /bin/bash

docker stop fileService
docker rm fileService
docker rmi file-service:1.0.0
docker build -t file-service:1.0.0 .
docker run -itd -p 80:80 --name fileService file-service:1.0.0