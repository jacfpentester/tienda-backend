# NODE Y VERSION
FROM node:16

ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_NAME
ARG DB_PASS
ARG DB_SYNC
ARG NODE_ENV
ARG WWW_PORT

ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_NAME=${DB_NAME}
ENV DB_PASS=${DB_PASS}
ENV DB_SYNC=${DB_SYNC}
ENV NODE_ENV=${NODE_ENV}
ENV WWW_PORT=${WWW_PORT}

# DIRECTORIO SOBRE EL QUE VAMOS A TRABAJAR
WORKDIR /api

# COPIAMOS EL package.json AL CONTENEDOR
COPY package*.json ./

# INSTALAR LAS DEPENDENCIAS DE LA API
RUN yarn install --force --ignore-scripts
RUN npm rebuild bcrypt --build-from-source
# RUN yarn rebuild bcrypt --build-from-source

# COPIAMOS TODOS LOS ARCHIVOS DE LA APP AL CONTENEDOR
COPY . .

# PARA PRODUCCION
ENV NODE_ENV=production

# PUERTO 3000 PARA NODE
EXPOSE 3000

# INICIAMOS NODE
CMD ["yarn", "start:dev"]



# # Etapa de instalación
# FROM node:16 as install
# LABEL stage=install

# ARG PROYECTO
# ARG DB_HOST
# ARG DB_NAME
# ARG DB_PORT
# ARG DB_USERNAME
# ARG DB_PASSWORD
# ARG NEST_PORT

# ENV PROYECTO=${PROYECTO}
# ENV DB_HOST=${DB_HOST}
# ENV DB_NAME=${DB_NAME}
# ENV DB_PORT=${DB_PORT}
# ENV DB_USERNAME=${DB_USERNAME}
# ENV DB_PASSWORD=${DB_PASSWORD}
# ENV NEST_PORT=${NEST_PORT}

# # Instalar dependencias necesarias
# RUN apt-get update && \
#     apt-get install -y curl gnupg && \
#     rm -rf /var/lib/apt/lists/*

# # Descargar y ejecutar el script de instalación de Yarn
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#     echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#     apt-get update && \
#     apt-get install -y yarn && \
#     rm -rf /var/lib/apt/lists/*

# WORKDIR /app
# COPY ./api/package.json .
# COPY ./api/yarn.lock .
# RUN yarn install --force --ignore-scripts
# RUN npm rebuild bcrypt --build-from-source

# COPY ./api .

# RUN yarn build
# RUN yarn config set network-timeout 60000

# CMD [ "npm", "start" ]

# # Etapa de despliegue
# FROM nginx:1.19.0-alpine as deploy
# LABEL stage=deploy

# COPY --from=install /app/dist/main.js /usr/share/nginx/html/index.js
# # COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80

# CMD [ "nginx", "-g", "daemon off;" ]
# # CMD [ "yarn", "start:prod" ]

# # CMD [ "sh", "-c", "nginx -g 'daemon off;' & yarn start:prod" ]


















# # Base image
# FROM node:16

# # Set the working directory to /app
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# # RUN npm install -g npm@9.6.2
# RUN yarn install --force --ignore-scripts
# RUN npm rebuild bcrypt --build-from-source
# # RUN  audit fix --force


# # Copy the rest of the application code
# COPY . .

# # Set NODE_ENV to production
# ENV NODE_ENV=production

# # Expose port 3000 for the Node.js server
# EXPOSE 3000

# # Start the Node.js server
# CMD ["yarn", "start:dev"]
# # RUN npm start

# # Iniciar NGINX en primer plano
# # CMD ["nginx", "-g", "daemon off;"]
