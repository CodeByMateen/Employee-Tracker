import { z } from 'zod';

// User validation schemas
export const createUserSchema = z.object({
  body: z.object({
    employeeId: z.string().min(3).max(50),
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    role: z.enum(['employee', 'manager', 'admin', 'hr']).optional().default('employee')
  })
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().transform(Number)
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    role: z.enum(['employee', 'manager', 'admin', 'hr']).optional(),
    isActive: z.boolean().optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  })
});

// Attendance validation schemas
export const checkInSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  })
});

export const checkOutSchema = z.object({
  params: z.object({
    id: z.string().transform(Number)
  })
});

export const getAttendanceSchema = z.object({
  query: z.object({
    userId: z.string().transform(Number).optional(),
    date: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional()
  })
});

// Break validation schemas
export const startBreakSchema = z.object({
  body: z.object({
    breakType: z.enum(['lunch', 'namaz', 'afk'])
  })
});

export const endBreakSchema = z.object({
  params: z.object({
    id: z.string().transform(Number)
  })
});

export const getBreaksSchema = z.object({
  query: z.object({
    attendanceRecordId: z.string().transform(Number).optional(),
    breakType: z.enum(['lunch', 'namaz', 'afk']).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
  })
});

// Report validation schemas
export const dailySummarySchema = z.object({
  query: z.object({
    date: z.string().optional()
  })
});

export const employeeReportSchema = z.object({
  query: z.object({
    userId: z.string().transform(Number),
    startDate: z.string(),
    endDate: z.string()
  })
});

// Location validation schema
export const locationValidationSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  })
});

// Pagination schema
export const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform(Number).optional().default(1),
    limit: z.string().transform(Number).optional().default(10)
  })
});

// Export all schemas
export const schemas = {
  createUser: createUserSchema,
  updateUser: updateUserSchema,
  login: loginSchema,
  checkIn: checkInSchema,
  checkOut: checkOutSchema,
  getAttendance: getAttendanceSchema,
  startBreak: startBreakSchema,
  endBreak: endBreakSchema,
  getBreaks: getBreaksSchema,
  dailySummary: dailySummarySchema,
  employeeReport: employeeReportSchema,
  locationValidation: locationValidationSchema,
  pagination: paginationSchema
}; 