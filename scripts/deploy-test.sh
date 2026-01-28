#!/bin/bash

# Deployment Test Script for Coolify
# This script tests the Docker build and basic functionality

set -e

echo "🚀 Starting deployment test..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Clean up any existing containers and images
echo "🧹 Cleaning up existing containers and images..."
docker-compose down -v
docker rmi ai-pitches 2>/dev/null || true

# Build the Docker image
echo "🏗️ Building Docker image..."
docker-compose build --no-cache

# Start the application
echo "🚀 Starting application..."
docker-compose up -d

# Wait for the application to start
echo "⏳ Waiting for application to start..."
sleep 30

# Check if the container is running
if ! docker-compose ps | grep -q "Up"; then
    echo "❌ Container failed to start"
    docker-compose logs
    exit 1
fi

# Test the health check endpoint
echo "🔍 Testing health check endpoint..."
HEALTH_CHECK=$(curl -s http://localhost:3000/health || echo "failed")

if echo "$HEALTH_CHECK" | grep -q '"status":"ok"'; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    echo "Response: $HEALTH_CHECK"
    docker-compose logs
    exit 1
fi

# Test basic database functionality
echo "🗄️ Testing database functionality..."
DB_TEST=$(curl -s http://localhost:3000/api/test-db || echo "failed")

if echo "$DB_TEST" | grep -q "success"; then
    echo "✅ Database test passed"
else
    echo "❌ Database test failed"
    echo "Response: $DB_TEST"
    docker-compose logs
    exit 1
fi

# Show container status
echo "📊 Container status:"
docker-compose ps

# Show recent logs
echo "📝 Recent logs:"
docker-compose logs --tail=20

echo "🎉 All tests passed! The application is ready for Coolify deployment."

# Clean up
echo "🧹 Cleaning up..."
docker-compose down -v

echo "✅ Deployment test completed successfully!"