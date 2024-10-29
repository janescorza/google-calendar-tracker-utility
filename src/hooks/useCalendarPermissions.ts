// useCalendarPermissions.ts
import { useState } from 'react';
import RNCalendarEvents from 'react-native-calendar-events';
import { Calendar } from '../types';
import { Alert } from 'react-native';

export const useCalendarPermissions = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  const requestCalendarPermissions = async () => {
    try {
      const auth = await RNCalendarEvents.requestPermissions();
      if (auth === 'authorized') fetchCalendars();
      else Alert.alert('Permission required to access calendar.');
    } catch (error) {
      console.error('Error requesting calendar permissions:', error);
    }
  };

  const fetchCalendars = async () => {
    try {
      const fetchedCalendars = await RNCalendarEvents.findCalendars();
      setCalendars(
        fetchedCalendars.map((cal) => ({
          id: cal.id,
          title: cal.title,
          isPrimary: cal.isPrimary,
        })),
      );
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  return { calendars, requestCalendarPermissions };
};
