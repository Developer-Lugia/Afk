# Use a lightweight Node.js base image matching the engine in package.json
FROM node:16-alpine

# create & switch to application directory
WORKDIR /usr/src/app

# copy package manifests & install production deps
COPY package*.json ./
RUN npm ci --only=production

# copy source code
COPY . .

# the bot does not open a web port, so EXPOSE is optional
# EXPOSE 3000

# runtime command should start the bot script
CMD [ "node", "bot.js" ]