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

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
```bash
# Copy example env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

5. Start the database (using Docker)
```bash
docker-compose up -d
```

6. Run database migrations
```bash
cd backend
npm run migrate
```

7. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend (in a new terminal):
```bash
cd frontend
npm start
```

## API Documentation

API endpoints will be available at `http://localhost:5000/api`

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

See LICENSE file for details.
