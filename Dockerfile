FROM kkarczmarczyk/node-yarn
ADD . /app
WORKDIR /app
RUN yarn install
CMD node main.js
EXPOSE 8081
