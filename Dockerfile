FROM node:17 as install
LABEL stage=install

ARG PROYECTO
ARG DB_HOST
ARG DB_NAME
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG NEST_PORT

ENV PROYECTO=${PROYECTO}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USER}
ENV DB_PASSWORD=${DB_PASS}
ENV NEST_PORT=${NEST_PORT}

WORKDIR /app
COPY  --chown=node:node ./package.json .
COPY --chown=node:node ./yarn.lock .
RUN npm install --force

COPY --chown=node:node ./ .

RUN npm start dev
