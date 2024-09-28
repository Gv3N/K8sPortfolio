# Stage 1: Build React app
FROM node:16-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install axios
RUN npm install react-router-dom
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Copy all files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80