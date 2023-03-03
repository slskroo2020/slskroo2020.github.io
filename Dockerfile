# Use the official Node.js image as the base image
FROM node:12

# Set the working directory in the container
WORKDIR /slskroo2020.github.io

# Copy the application files into the working directory
COPY . .

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]