build:
	npm i
	npm run build
	docker image rm papaya147/weatherman-dashboard || true
	docker build -t papaya147/weatherman-dashboard:latest .

push: build
	docker push papaya147/weatherman-dashboard:latest

.PHONY: build push