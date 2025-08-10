# Employee Attendance Tracking System - Backend

A robust backend API built with Fastify, TypeScript, and Prisma for tracking employee attendance with geolocation support, flexible break management, and Islamic prayer time considerations.

## 🚀 Features

- **Real-time Attendance Tracking** with geolocation validation
- **Flexible Break Management** for lunch, prayer, and personal time
- **Smart Time Calculations** with penalty systems for violations
- **Comprehensive Reporting** and analytics
- **RESTful API** with Swagger documentation
- **TypeScript** for type safety and better development experience
- **PostgreSQL** database with Prisma ORM
- **Input Validation** with Zod schemas
- **Rate Limiting** and security features

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: bcryptjs (password hashing)
- **Documentation**: Swagger/OpenAPI

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
cd Server
npm install
```

### 2. Environment Setup

Copy the environment file and configure your database:

```bash
cp env.example .env
```

Edit `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/attendance_tracker"
PORT=3000
HOST="0.0.0.0"
NODE_ENV="development"
BCRYPT_ROUNDS=12
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Run migrations
npm run db:migrate

# (Optional) Open Prisma Studio
npm run db:studio
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:3000/docs`
- **Health Check**: `http://localhost:3000/health`

## 🗄️ Database Schema

### Core Tables

1. **users** - Employee information and authentication
2. **office_locations** - Office coordinates and radius
3. **attendance_records** - Daily attendance tracking
4. **break_records** - Break time management
5. **system_config** - System configuration values

### Key Features

- **Geolocation Tracking**: Validates check-in location against office coordinates
- **Flexible Timing**: 20-minute grace period for late arrivals
- **Break Management**: Lunch (1-3 PM), prayer times, and AFK tracking
- **Status Calculation**: Automatic status determination (present, late, left early)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

## 📁 Project Structure

```
src/
├── index.ts              # Main server entry point
├── types/                # TypeScript type definitions
│   └── index.ts
├── utils/                # Utility functions and helpers
│   ├── constants.ts      # System constants
│   ├── helpers.ts        # Helper functions
│   └── validation.ts     # Zod validation schemas
├── routes/               # API route handlers
│   ├── users.ts          # User management routes
│   ├── attendance.ts     # Attendance tracking routes
│   ├── breaks.ts         # Break management routes
│   └── reports.ts        # Reporting routes
├── services/             # Business logic services
├── middleware/           # Custom middleware
└── database/             # Database related files
    └── seed.ts           # Database seeding
```

## 🔒 Security Features

- **CORS** configuration for cross-origin requests
- **Helmet** for security headers
- **Rate Limiting** to prevent abuse
- **Input Validation** with Zod schemas
- **Password Hashing** with bcrypt

## 📊 Business Rules

### Office Timing
- **Start Time**: 10:00 AM with 20-minute flexibility (until 10:20 AM)
- **End Time**: 7:00 PM (early departure tracking)

### Break Management
- **Lunch**: 1:00 PM - 3:00 PM (max 1 hour)
- **Prayer Times**: Flexible durations based on prayer type
- **AFK**: 10-minute flexibility for washroom breaks

### Geolocation
- **Office Radius**: Configurable radius for valid check-in locations
- **Location Validation**: Automatic validation on check-in

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Production Build

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please create an issue in the repository or contact the development team.

---

**Note**: This is a backend-only implementation. The frontend client should be implemented separately to consume these APIs. 