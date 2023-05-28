FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

ARG npm_token

RUN echo "//npm.pkg.github.com/:_authToken="${npm_token}" \n @domipas:registry=https://npm.pkg.github.com \n always-auth=true" > .npmrc

RUN npm install pnpm -g
# If you are building your code for production
RUN pnpm install --only=production

RUN pnpm run build

# Expose ports
EXPOSE 8284
EXPOSE 8285
CMD [ "npm", "start" ]