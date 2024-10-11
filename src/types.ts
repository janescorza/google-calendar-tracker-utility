// src/types.ts
export interface DefaultEvent {
  name: string;
  location: string;
  duration: number; // in minutes
}

export interface Calendar {
  id: string;
  title: string;
  isPrimary: boolean;
}
