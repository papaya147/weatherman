build:
	docker image rm papaya147/weatherman-model || true
	docker build -t papaya147/weatherman-model:latest .

push: build
	docker push papaya147/weatherman-model:latest

.PHONY: build push