# Find the current git reflog and set it as the tag
TAG := $(shell git reflog show | awk '{print $$1'})

.PHONY: build
build:
	GOOS=linux go build -v -o siteserver cmd/siteserver/main.go
	yarn build
	docker build -t eu.gcr.io/pulfer-website/siteserver:$(TAG) .

.PHONY: clean
clean:
	rm -f siteserver

.PHONY: deploy
deploy: clean build
	gcloud container clusters get-credentials --region europe-west2 pulfer-website
	docker push eu.gcr.io/pulfer-website/siteserver:$(TAG)
	kubectl set image deployment/pulfer-siteserver pulfer-siteserver=eu.gcr.io/pulfer-website/siteserver:$(TAG)
	rm -f siteserver
