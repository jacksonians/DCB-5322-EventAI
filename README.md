# DCB-5322-EventAI

A full-stack web application with frontend, backend, and database layers.

## Project Structure

```
DCB-5322-EventAI/
├── frontend/          # React frontend application
├── backend/           # Node.js/Express backend API
├── database/          # Database migrations, seeds, and schemas
├── docker-compose.yml # Docker configuration for local development
└── README.md
```

## Tech Stack

### Frontend
- React
- Axios for API calls
- CSS/Styling framework of your choice

### Backend
- Node.js
- Express.js
- RESTful API architecture

### Database
- PostgreSQL (can be swapped for MySQL/MongoDB)
- Database migrations and seeding

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Docker and Docker Compose (optional, for database)

### Installation

1. Clone the repository
```bash
git clone https://github.com/jacksonians/DCB-5322-EventAI.git
cd DCB-5322-EventAI
```

2. Install all dependencies (root, backend, and frontend)
```bash
npm run install:all
```

3. Set up environment variables
```bash
# Copy example env files
cp backend/.env.example backend/.env
cp "frontend/Create Wireframe from Image/.env.example" "frontend/Create Wireframe from Image/.env"
```

4. Start the database (using Docker)
```bash
docker-compose up -d
```

5. Run database migrations
```bash
cd backend
npm run migrate
```

6. Start both development servers
```bash
# From the root directory
npm run dev
```

This will start:
- **Backend API** at `http://localhost:5001`
- **Frontend** at `http://localhost:3000` (or 3001 if 3000 is in use)

## API Documentation

API endpoints will be available at `http://localhost:5001/api`

Health check: `http://localhost:5001/api/health`

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

See LICENSE file for details.
