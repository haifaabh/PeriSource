
# Use an official Node.js runtime as a base image with version 18
FROM node:18.14.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which your React app will run
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
