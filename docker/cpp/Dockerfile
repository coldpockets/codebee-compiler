FROM gcc:latest

RUN mkdir src build
RUN touch build/test1
RUN touch build/test2

COPY src src
COPY compile.sh compile.sh

ENTRYPOINT [ "./compile.sh" ]
