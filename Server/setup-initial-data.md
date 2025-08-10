# Initial Data Setup Guide

After setting up your database and running the server, follow these steps to create the initial data:

## 1. Initialize System Configuration
```bash
POST http://localhost:3000/api/system-config/initialize
```

This will create all the system configuration values including your office coordinates.

## 2. Create Office Location
```bash
POST http://localhost:3000/api/office-locations
Content-Type: application/json

{
  "name": "Corvit Labs Faisalabad",
  "latitude": 31.740414,
  "longitude": 73.831978,
  "radiusMeters": 100
}
```

## 3. Create Admin User
```bash
POST http://localhost:3000/api/users/admin
```

This will create an admin user with:
- **Email**: admin@corvitlabs.com
- **Password**: admin123
- **Role**: admin
- **Employee ID**: ADMIN001

## 4. Verify Setup
```bash
# Check system configs
GET http://localhost:3000/api/system-config

# Check office locations
GET http://localhost:3000/api/office-locations

# Check users
GET http://localhost:3000/api/users
```

## Alternative: Create Admin User Manually
If you prefer to create the admin user manually:

```bash
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "employeeId": "ADMIN001",
  "name": "System Administrator",
  "email": "admin@corvitlabs.com",
  "password": "admin123",
  "role": "admin"
}
```

## Notes
- The admin password is set to "admin123" - change this in production
- Office location radius is set to 100 meters by default
- All system configurations are set according to your business rules
- Make sure your database is running and Prisma is properly configured
