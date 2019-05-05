
.PHONY: build
build:
	GOOS=linux go build -v -o siteserver cmd/siteserver/main.go
	docker build -t eu.gcr.io/pulfer-website/siteserver:v2 .

.PHONY: clean
clean:
	rm -f siteserver

.PHONY: deploy
deploy: clean build
	docker push eu.gcr.io/pulfer-website/siteserver
	rm -f siteserver