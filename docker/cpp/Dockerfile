FROM gcc:latest

RUN mkdir src build

COPY src src
COPY compile.sh compile.sh

ENTRYPOINT [ "./compile.sh" ]
