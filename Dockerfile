# pull official base image
FROM node:current-alpine3.14
# set working directory
WORKDIR /app
# Copies package.jsonherokulogs to Docker environment
COPY package.json .
# Installs all node packages
RUN npm install
# Copies everything over to Docker environment
COPY . .
# Build for production.
RUN npm run build --production
# Install `serve` to run the application.
RUN npm install -g serve
# Uses port which is used by the actual application
EXPOSE 5000:5000
# Run application
CMD ["serve", "-s", "build"]
