FROM node:10
RUN mkdir -p /opt/shoutbox
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229

RUN npm install nodemon -g --registry=https://registry.npm.taobao.org

WORKDIR /opt/shoutbox
COPY package.json *-lock.json ./
RUN npm install --no-cache --registry=https://registry.npm.taobao.org
ENV PATH /opt/shoutbox/node_modules/.bin:$PATH

WORKDIR /opt/shoutbox
COPY . /opt/shoutbox

CMD [ "node", "./bin/www" ]
