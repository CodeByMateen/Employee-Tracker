// Office timing constants
export const OFFICE_START_TIME = '10:00';
export const OFFICE_START_FLEXIBILITY_MINUTES = 20; // Until 10:20 AM
export const OFFICE_END_TIME = '19:00'; // 7:00 PM

// Break timing constants
export const LUNCH_START_TIME = '13:00'; // 1:00 PM
export const LUNCH_END_TIME = '15:00'; // 3:00 PM
export const LUNCH_MAX_DURATION_MINUTES = 60; // 1 hour

// AFK flexibility
export const AFK_FLEXIBILITY_MINUTES = 10; // 10 minutes allowed without penalty

// Prayer time flexibility (in minutes)
export const PRAYER_FLEXIBILITY = {
  FAJR: 15,
  ZOHAR: 20,
  ASAR: 15,
  MAGHRIB: 15,
  ISHA: 20
};

// Status constants
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  LATE: 'late',
  LEFT_EARLY: 'left_early',
  ABSENT: 'absent'
} as const;

export const BREAK_TYPES = {
  LUNCH: 'lunch',
  NAMAZ: 'namaz',
  AFK: 'afk'
} as const;

export const LOCATION_STATUS = {
  VALID: 'valid',
  INVALID: 'invalid'
} as const;

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

// Geolocation constants
export const DEFAULT_OFFICE_RADIUS_METERS = 100;

// Time format constants
export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// Error messages
export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  ATTENDANCE_RECORD_NOT_FOUND: 'Attendance record not found',
  BREAK_RECORD_NOT_FOUND: 'Break record not found',
  ALREADY_CHECKED_IN: 'Already checked in for today',
  ALREADY_CHECKED_OUT: 'Already checked out for today',
  NOT_CHECKED_IN: 'Not checked in for today',
  BREAK_ALREADY_STARTED: 'Break already started',
  BREAK_NOT_STARTED: 'Break not started',
  BREAK_TIME_EXCEEDED: 'Break time exceeded maximum limit',
  BREAK_OUTSIDE_ALLOWED_TIME: 'Break not allowed outside allowed time',
  LOCATION_INVALID: 'Check-in location is outside office premises',
  INVALID_BREAK_TYPE: 'Invalid break type',
  INVALID_TIME: 'Invalid time provided',
  UNAUTHORIZED: 'Unauthorized access',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_ERROR: 'Internal server error'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  LOGIN_SUCCESS: 'Login successful',
  CHECK_IN_SUCCESS: 'Check-in successful',
  CHECK_OUT_SUCCESS: 'Check-out successful',
  BREAK_STARTED: 'Break started successfully',
  BREAK_ENDED: 'Break ended successfully',
  RECORD_CREATED: 'Record created successfully',
  RECORD_UPDATED: 'Record updated successfully',
  RECORD_DELETED: 'Record deleted successfully'
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
} as const; 