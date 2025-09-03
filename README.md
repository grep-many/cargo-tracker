# 📦 Cargo Tracker  

A full-stack logistics tracking app with **Node.js + Express backend**, **React + Vite frontend**, and **MongoDB database**, all containerized using **Docker Compose** for easy local development.  

---

## 🔧 Features  
- **Backend (Node.js + Express)**  
  - REST APIs for shipments  
  - MongoDB integration  
  - Nodemon hot-reload in dev  

- **Frontend (React + Vite)**  
  - Fast dev server  
  - API integration with backend  
  - Environment-based configs  

- **Database (MongoDB)**  
  - Runs in a container  
  - Persistent volume storage  

---

## 🚀 Getting Started  

### 1. Clone the repo
```bash
git clone https://github.com/grep-many/cargo-tracker.git
cd cargo-tracker
```

### 2. Setup environment files  

**backend/.env**  
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/logistics
```

**webapp/.env**  
```env
VITE_API_URL=http://backend:5000
MODE=development
```

---

### 3. Run with Docker Compose  
```bash
docker compose up --build
```

- **Frontend:** http://localhost:5173  
- **Backend API:** http://localhost:5000  
- **MongoDB:** mongodb://mongo:27017  

---

### 4. Stopping & Cleaning Up  
```bash
# Stop services
docker compose down

# Stop & remove containers, networks, volumes, images
docker system prune -af --volumes
```

---

## 🛠 Development Notes  
- Volumes ensure **hot reload** (`nodemon` for backend, Vite dev for frontend).  
- MongoDB data is persisted in a named Docker volume (`mongo_data`).  
- No need to install Node.js or MongoDB locally — everything runs inside Docker.  

---
