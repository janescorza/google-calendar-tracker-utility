import { Calendar } from '../types';

// utils/calendarUtils.ts
export const getCalendarName = (calendarId: string, calendars: Calendar[]) => {
  const calendar = calendars.find((cal) => cal.id === calendarId);
  return calendar ? calendar.title : 'Unknown Calendar';
};
