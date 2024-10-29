// src/types.ts
export interface BaseEvent {
  name: string;
  location: string;
  duration: number; // in minutes
  calendarId: string;
}

export interface Calendar {
  id: string;
  title: string;
  isPrimary: boolean;
}
