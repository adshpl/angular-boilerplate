FROM node:latest

ARG WORK_DIR=/usr/app

RUN mkdir $WORK_DIR; exit 0
WORKDIR $WORK_DIR

COPY package.json $WORK_DIR
COPY yarn.lock $WORK_DIR
COPY . $WORK_DIR
RUN yarn install

CMD ["node"]