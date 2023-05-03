#!/bin/bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
if [ -d "postgres" ]; then
sudo rm -R postgres
else
docker-compose -f postgres.yml up -d
fi
exit
