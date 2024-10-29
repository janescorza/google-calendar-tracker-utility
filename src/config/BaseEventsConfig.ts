// BaseEventsConfig.ts
import { BaseEvent } from '../types';

export const initialBaseEvents: BaseEvent[] = [
  { name: 'Sleep', location: 'Home', duration: 480, calendarId: '1' },
  { name: 'Lunch', location: 'Home', duration: 30, calendarId: '1' },
  { name: 'Gym', location: '', duration: 60, calendarId: '1' },
  { name: 'Shower', location: 'Gym', duration: 30, calendarId: '1' },
];
