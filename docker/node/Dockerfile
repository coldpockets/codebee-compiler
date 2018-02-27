FROM node:latest

RUN npm install -g esprima
RUN mkdir src build

COPY src src
COPY compile.sh compile.sh

ENTRYPOINT [ "./compile.sh" ]
