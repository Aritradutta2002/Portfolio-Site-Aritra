#!/bin/bash

echo "Starting Aritra's Blog API..."
echo

cd "$(dirname "$0")"

echo "Checking Java installation..."
if ! java -version 2>&1 | grep -q "version"; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java 17 or later"
    exit 1
fi

echo
echo "Starting Spring Boot application..."
echo "API will be available at: http://localhost:8080/api"
echo "Swagger UI will be available at: http://localhost:8080/api/swagger-ui.html"
echo "H2 Console will be available at: http://localhost:8080/api/h2-console"
echo
echo "Admin credentials: admin / admin123"
echo

mvn spring-boot:run

echo
echo "Blog API has stopped."