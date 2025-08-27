# Step 1: Use Node.js as a base image
# We use the stable and up-to-date 20-alpine version for production
FROM node:20-alpine

# Step 2: Set the working directory in the container
# All files will be placed and executed in the /app directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
# The build context is the 'backend' folder, so we copy files from the current directory
COPY package*.json ./

# Step 4: Install all dependencies
RUN npm install

# Step 5: Copy all backend files
# This copies all files and folders from the current directory (backend) to the container
COPY . .

# Step 6: Expose the port for the backend application
EXPOSE 5000

# Step 7: Define the command to run the backend server
# The main server file is located at src/app.js
CMD [ "node", "-r", "dotenv/config", "src/app.js" ]
