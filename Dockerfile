# Use a Node.js base image
FROM node:18.3-alpine

#install nest
RUN npm i -g @nestjs/cli

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install NestJS dependencies
RUN npm install --production --legacy-peer-deps 

# Copy the rest of the application code
COPY . .

# Expose the port that the NestJS application is listening on
EXPOSE 3000

#build
RUN npm run build

# Define the command to start the NestJS application
CMD ["npm", "run", "start:prod"]
