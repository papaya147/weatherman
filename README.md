
# Weatherman
A robust IoT-compatible pipeline for collecting, processing, and visualizing weather telemetry data. This project integrates a mock data generator, MQTT-based data streaming, a PostgreSQL database for storage, a server for data processing, a dashboard for visualization, and a random forest model for weather predictions. Docker Compose orchestrates the deployment of all components for seamless operation.

## Features
- [**Mock Data Generator**](https://github.com/papaya147/weatherman/tree/main/mock-data-generator): Generates synthetic weather data (timestamp, temperature, humidity, wind speed, wind direction, pressure, water amount) and publishes it to an MQTT broker.
- [**Telemetry Service**](https://github.com/papaya147/weatherman/tree/main/telemetry): Subscribes to MQTT, ingests weather data, stores it in PostgreSQL, serves data to the dashboard, and provides an API for downloading data as CSV for model training.
- [**Dashboard**](https://github.com/papaya147/weatherman/tree/main/dashboard): Visualizes weather metrics with interactive graphs for real-time monitoring.
- [**Random Forest Model**](https://github.com/papaya147/weatherman/tree/main/model): Supports model training and deployment for weather predictions, integrated with the telemetry server.
- **Docker Compose**: Orchestrates all services (MQTT broker, PostgreSQL, telemetry server, dashboard) for easy deployment.

### Connecting Custom MQTT Producer
The weather telemetry data is defined in [`telemetry/proto/weather-telemetry.proto`](https://github.com/papaya147/weatherman/blob/main/telemetry/proto/weather-telemetry.proto) and defined as:
```proto
syntax = "proto3";

package weatherdata;

message WeatherTelemetry {
    uint64 timestamp = 1;
    double temperature = 2;
    double humidity = 3;
    double windSpeed = 4;
    double windDirection = 5;
    double pressure = 6;
    double waterAmount = 7;
}
```

## Prerequisites
- **Make**
-   **Docker** and **Docker Compose** installed.
-   Basic understanding of Docker and containerization.
-   Conda (for running the mock data generator standalone).
-   Optional: Go environment and **protoc** (if modifying the Protobuf definitions or related services).

## Setup and Installation
1. Clone the Repository
```bash
git clone https://github.com/papaya147/weatherman.git
cd weatherman
```
2. Build and Run the Services
```bash
make build_deploy
```
3. Build and Run the Mock Data Generator (not required if you have an MQTT producer)
```bash
cd mock-data-generator
conda create --prefix ./env python=3.11
conda activate ./env
pip install -r requirements.txt
python generator.py --start-date 2003-01-01 --end-date 2024-01-01
```
Alternatively, create a container with docker:
```bash
cd mock-data-generator
docker build --build-arg START_DATE=2003-01-01 --build-arg END_DATE=2024-01-01 -t data-generator:latest .
```
