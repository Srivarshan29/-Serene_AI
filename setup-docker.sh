#!/bin/bash

# Serene AI Docker Setup Script
echo "🚀 Setting up Docker for Serene AI..."

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p backend

# Copy environment file
echo "🔧 Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please edit .env and add your GEMINI_API_KEY"
else
    echo "✅ .env file already exists"
fi

# Build and start services
echo "🐳 Building Docker containers..."
docker-compose build

echo "🎉 Setup complete!"
echo ""
echo "To start your application:"
echo "  docker-compose up"
echo ""
echo "To run in development mode:"
echo "  1. Uncomment the frontend-dev service in docker-compose.yml"
echo "  2. docker-compose up frontend-dev backend"
echo ""
echo "Your application will be available at:"
echo "  Frontend: http://localhost:4173"
echo "  Backend: http://localhost:3001"
