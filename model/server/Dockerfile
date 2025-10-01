
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir fastapi uvicorn pydantic scikit-learn

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV MODEL_FILE=best_random_forest.pkl

# Run uvicorn when the container launches
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "80"]
