FROM node:12.22.1 as nodeBuilder

RUN mkdir /wint_ui
WORKDIR /wint_ui
COPY /src /app/src
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

EXPOSE 3000