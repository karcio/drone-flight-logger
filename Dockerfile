FROM ubuntu:xenial

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y git curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN git clone -b development https://github.com/karcio/drone-flight-logger.git
RUN cd drone-flight-logger
RUN npm install
