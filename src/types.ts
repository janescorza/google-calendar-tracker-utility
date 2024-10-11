// src/types.ts
export interface DefaultEvent {
  name: string;
  location: string;
  duration: number; // in minutes
  calendarId: string; // Add this line
}

export interface Calendar {
  id: string;
  title: string;
  isPrimary: boolean;
}
