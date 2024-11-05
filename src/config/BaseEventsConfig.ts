// BaseEventsConfig.ts
import { BaseEvent } from '../types';

export const initialBaseEvents: BaseEvent[] = [
  { id: '1', name: 'Sleep', location: 'Home', duration: 480, calendarId: '1' },
  { id: '2', name: 'Lunch', location: 'Home', duration: 30, calendarId: '1' },
  { id: '3', name: 'Gym', location: '', duration: 60, calendarId: '1' },
  { id: '4', name: 'Shower', location: 'Gym', duration: 30, calendarId: '1' },
];
