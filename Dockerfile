FROM golang:alpine

COPY ./siteserver /siteserver

COPY ./build /website

CMD /siteserver