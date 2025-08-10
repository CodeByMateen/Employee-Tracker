// User related types
export interface CreateUserRequest {
  employeeId: string;
  name: string;
  email: string;
  password: string;
  role?: 'employee' | 'manager' | 'admin' | 'hr';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'employee' | 'manager' | 'admin' | 'hr';
  isActive?: boolean;
}

export interface UserResponse {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserResponse;
  message: string;
}

// Attendance related types
export interface CheckInRequest {
  latitude: number;
  longitude: number;
}

export interface CheckOutRequest {
  // No additional data needed for check-out
}

export interface AttendanceRecordResponse {
  id: number;
  userId: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  checkInLatitude: number | null;
  checkInLongitude: number | null;
  checkInLocationStatus: string;
  totalWorkHours: number | null;
  status: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    employeeId: string;
  };
}

// Break related types
export interface StartBreakRequest {
  breakType: 'lunch' | 'namaz' | 'afk';
}

export interface EndBreakRequest {
  breakId: number;
}

export interface BreakRecordResponse {
  id: number;
  attendanceRecordId: number;
  breakType: string;
  startTime: string;
  endTime: string | null;
  durationMinutes: number | null;
  createdAt: string;
}

// Report related types
export interface DailySummaryResponse {
  totalEmployees: number;
  present: number;
  late: number;
  leftEarly: number;
  absent: number;
  lateDetails: Array<{
    employeeId: string;
    name: string;
    checkInTime: string;
    lateMinutes: number;
  }>;
}

export interface EmployeeReportRequest {
  userId: number;
  startDate: string;
  endDate: string;
}

export interface EmployeeReportResponse {
  userId: number;
  employeeName: string;
  employeeId: string;
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalDays: number;
    presentDays: number;
    lateDays: number;
    absentDays: number;
    totalWorkHours: number;
    averageWorkHours: number;
  };
  dailyRecords: Array<{
    date: string;
    checkInTime: string | null;
    checkOutTime: string | null;
    status: string;
    totalWorkHours: number | null;
    breaks: BreakRecordResponse[];
  }>;
}

// System configuration types
export interface SystemConfigResponse {
  officeStartTime: string;
  officeStartFlexibility: number;
  officeEndTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  lunchMaxDuration: number;
  afkFlexibility: number;
  prayerFlexibility: {
    fajr: number;
    zohar: number;
    asar: number;
    maghrib: number;
    isha: number;
  };
}

// Geolocation types
export interface LocationValidationRequest {
  latitude: number;
  longitude: number;
}

export interface LocationValidationResponse {
  isValid: boolean;
  distance: number;
  message: string;
}

// Common types
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 