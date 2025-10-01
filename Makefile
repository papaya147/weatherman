deploy:
	docker-compose up

build_deploy: build_dashboard build_telemetry_server build_model deploy

build_telemetry_server:
	git clone https://github.com/weatherman-org/telemetry.git
	cd ./telemetry && make build

build_dashboard:
	git clone https://github.com/weatherman-org/dashboard.git
	cd ./dashboard && make build

build_model:
	git clone https://github.com/weatherman-org/model.git
	cd ./model/server && make build