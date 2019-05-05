FROM golang:alpine

COPY ./siteserver /siteserver

COPY ./website /website

CMD /siteserver