#!/bin/bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
if [ -d "postgres" ]; then
sudo rm -R postgres
fi
docker-compose -f postgres.yml up -d
cd src
npm start dev
exit
