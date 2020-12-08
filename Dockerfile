FROM node:15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

RUN echo .npmrc

#RUN npm install
# If you are building your code for production
RUN npm ci --only=production

RUN npm run postinstall

# Expose ports
EXPOSE 8284
EXPOSE 8285
CMD [ "npm", "start" ]