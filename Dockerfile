FROM node:alpine
# create a  working directory
WORKDIR "/app"

# Copy the package.json
COPY package.json .

# install the packages
RUN npm install

# copy all the contents into docker file
COPY . .


# Run the application
CMD ["npm", "start"]