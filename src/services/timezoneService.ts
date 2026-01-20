import { format, addSeconds } from 'date-fns';

/**
 * Calculate the local time at a location given its timezone offset
 * @param timezoneOffset - Offset in seconds from UTC
 * @returns Formatted local time string
 */
export const getLocalTime = (timezoneOffset: number): string => {
  // Get current UTC time
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

  // Add the location's timezone offset
  const localTime = new Date(utcTime + (timezoneOffset * 1000));

  // Format the time
  return format(localTime, 'PPpp'); // e.g., "Jan 19, 2026, 3:45:00 PM"
};

/**
 * Get just the time portion (HH:mm:ss)
 * @param timezoneOffset - Offset in seconds from UTC
 * @returns Formatted time string
 */
export const getLocalTimeShort = (timezoneOffset: number): string => {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utcTime + (timezoneOffset * 1000));

  return format(localTime, 'HH:mm:ss');
};

/**
 * Get date and time separately
 * @param timezoneOffset - Offset in seconds from UTC
 * @returns Object with formatted date and time
 */
export const getLocalDateTime = (timezoneOffset: number): { date: string; time: string } => {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utcTime + (timezoneOffset * 1000));

  return {
    date: format(localTime, 'PPP'), // e.g., "January 19, 2026"
    time: format(localTime, 'h:mm a'),  // e.g., "5:09 PM"
  };
};
