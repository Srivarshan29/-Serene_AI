# Serene AI Docker Configuration

This package contains complete Docker configuration files for your Serene AI project.

## 📁 Project Structure
```
your-project/
├── Dockerfile                  # Frontend container (React + Vite)
├── backend/
│   ├── Dockerfile             # Backend container (Node.js + Express)  
│   └── .dockerignore          # Backend ignore file
├── docker-compose.yml         # Orchestrates both services
├── .dockerignore             # Frontend ignore file
├── Dockerfile.dev            # Development container with hot reload
├── .env.example              # Environment variables template
└── setup-docker.sh           # Automated setup script
```

## 🚀 Quick Start

1. **Extract all files** to your Serene AI project root directory
2. **Setup environment**:
   ```bash
   cp .env.example .env
   # Edit .env file and add your actual GEMINI_API_KEY
   ```
3. **Build and run**:
   ```bash
   docker-compose up --build
   ```

## 🌐 Access Your Application
- **Frontend**: http://localhost:4173
- **Backend**: http://localhost:3001

## 🔧 Available Commands

### Production Mode
```bash
# Build and start all services
docker-compose up --build

# Run in background (detached)
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

### Development Mode (Hot Reload)
1. Edit `docker-compose.yml` and uncomment the `frontend-dev` service
2. Run:
```bash
docker-compose up frontend-dev backend
```

### Individual Container Commands
```bash
# Build frontend only
docker build --build-arg GEMINI_API_KEY=your_key -t serene-ai-frontend .
docker run -p 4173:4173 serene-ai-frontend

# Build backend only
cd backend
docker build -t serene-ai-backend .
docker run -p 3001:3001 -e GEMINI_API_KEY=your_key serene-ai-backend
```

## 📋 Features Included
- ✅ **Multi-stage builds** for optimized frontend images
- ✅ **Security** with non-root users in both containers
- ✅ **Development mode** with hot reload support
- ✅ **Production ready** optimized containers
- ✅ **Docker Compose** orchestration with networking
- ✅ **Environment variable** management
- ✅ **Alpine Linux** base images for smaller size

## 🐳 Container Architecture
- **Frontend Container**: 
  - React + TypeScript + Vite
  - Multi-stage build (deps → builder → runner)
  - Runs on port 4173
  - Uses Vite preview mode for production

- **Backend Container**:
  - Node.js + Express
  - Single-stage optimized build
  - Runs on port 3001
  - Production dependencies only

- **Networking**: 
  - Custom bridge network `serene-ai-network`
  - Services can communicate internally
  - Frontend depends on backend startup

## 🛠️ Troubleshooting

### Common Issues:
1. **Port conflicts**: Make sure ports 4173 and 3001 are available
2. **API Key missing**: Ensure GEMINI_API_KEY is set in .env file
3. **Docker not running**: Start Docker Desktop/daemon
4. **Build failures**: Check Docker has enough disk space

### Useful Commands:
```bash
# Check running containers
docker ps

# View container logs
docker logs <container_name>

# Access container shell
docker exec -it <container_name> sh

# Clean up unused Docker resources
docker system prune
```

## 📞 Support
If you encounter issues:
1. Verify all files are in correct locations
2. Check Docker and Docker Compose versions
3. Ensure your GEMINI_API_KEY is valid
4. Review container logs for specific error messages

## 🚀 Deployment Ready
These Docker configurations are production-ready and can be deployed to:
- Docker Swarm
- Kubernetes  
- AWS ECS
- Google Cloud Run
- Any Docker-compatible platform

Happy containerizing your Serene AI project! 🎉
