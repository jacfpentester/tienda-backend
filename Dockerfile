# Base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Import environment variables from .env file
ARG BACKEND_NODE_PORT
ARG BACKEND_NGINX_PORT
ARG BACKEND_POSTGRES_PORT    
ARG DB_HOST
ARG DB_NAME
ARG DB_USER 
ARG DB_PASS
ARG DB_PORT
ARG PORT
ARG HOST_API  
ARG JWT_SECRET
ARG NODE_ENV

ENV BACKEND_NODE_PORT=${BACKEND_NODE_PORT}        
ENV BACKEND_NGINX_PORT=${BACKEND_NGINX_PORT}
ENV BACKEND_POSTGRES_PORT=${BACKEND_POSTGRES_PORT}    
ENV DB_HOST=${DB_HOST}  
ENV DB_NAME=${DB_NAME}  
ENV DB_USER=${DB_USER}  
ENV DB_PASS=${DB_PASS}  
ENV DB_PORT=${DB_PORT}  
ENV PORT=${PORT}  
ENV HOST_API=${HOST_API}  
ENV JWT_SECRET=${JWT_SECRET} 
ENV NODE_ENV=${NODE_ENV} 

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY --chown=node:node ./ .

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose port 3000 for the Node.js server
EXPOSE 3000

# Start the Node.js server
CMD ["npm", "start"]
# RUN npm start

# Iniciar NGINX en primer plano
# CMD ["nginx", "-g", "daemon off;"]