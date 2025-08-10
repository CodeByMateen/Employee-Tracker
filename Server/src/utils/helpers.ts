import { Decimal } from "@prisma/client/runtime/library";

// Time utility functions
export const formatTime = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0] || "";
};

export const parseTime = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours || 0, minutes || 0, 0, 0);
  return date;
};

export const isTimeBetween = (
  time: Date,
  startTime: string,
  endTime: string
): boolean => {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  return time >= start && time <= end;
};

export const calculateMinutesDifference = (
  startTime: Date,
  endTime: Date
): number => {
  const diffMs = endTime.getTime() - startTime.getTime();
  return Math.floor(diffMs / (1000 * 60));
};

export const calculateHoursDifference = (
  startTime: Date,
  endTime: Date
): number => {
  const diffMs = endTime.getTime() - startTime.getTime();
  return parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));
};

// Geolocation utility functions
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const isLocationValid = (
  userLat: number,
  userLon: number,
  officeLat: number,
  officeLon: number,
  radiusMeters: number
): boolean => {
  const distance = calculateDistance(userLat, userLon, officeLat, officeLon);
  return distance <= radiusMeters;
};

// Attendance status calculation
export const calculateAttendanceStatus = (checkInTime: Date): string => {
  const officeStartTime = parseTime("10:00");
  const flexibilityTime = new Date(officeStartTime.getTime() + 20 * 60 * 1000); // 10:20 AM

  if (checkInTime <= flexibilityTime) {
    return "present";
  } else {
    return "late";
  }
};

export const isLeftEarly = (checkOutTime: Date): boolean => {
  const officeEndTime = parseTime("19:00"); // 7:00 PM
  return checkOutTime < officeEndTime;
};

// Break validation functions
export const isLunchTimeValid = (startTime: Date): boolean => {
  return isTimeBetween(startTime, "13:00", "15:00");
};

export const calculateBreakDuration = (
  startTime: Date,
  endTime: Date
): number => {
  return calculateMinutesDifference(startTime, endTime);
};

export const isBreakDurationValid = (
  durationMinutes: number,
  breakType: string
): boolean => {
  switch (breakType) {
    case "lunch":
      return durationMinutes <= 60;
    case "namaz":
      return durationMinutes <= 20; // Maximum prayer time
    case "afk":
      return durationMinutes <= 10; // AFK flexibility
    default:
      return false;
  }
};

// Pagination helper
export const getPaginationInfo = (
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    total,
    totalPages,
    offset,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

// Response helper
export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
) => {
  return {
    success,
    ...(data && { data }),
    ...(message && { message }),
    ...(error && { error }),
  };
};

// Error response helper
export const createErrorResponse = (
  message: string,
  statusCode: number = 400
) => {
  return {
    success: false,
    error: message,
    statusCode,
  };
};

// Success response helper
export const createSuccessResponse = <T>(data: T, message?: string) => {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
};

// Decimal conversion helpers for Prisma
export const toDecimal = (value: number): Decimal => {
  return new Decimal(value);
};

export const fromDecimal = (decimal: Decimal | null): number | null => {
  return decimal ? parseFloat(decimal.toString()) : null;
};

// Date validation
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
export const isPasswordStrong = (password: string): boolean => {
  return password.length >= 6;
};
