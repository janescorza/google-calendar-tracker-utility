// CalendarEventsManager.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import DefaultEventsList from './DefaultEventsList';
import EventConfigurationCard from './EventConfigurationCard';
import { DefaultEvent, Calendar } from '../types.ts';

const CalendarEventsManager: React.FC = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [defaultEvents, setDefaultEvents] = useState<DefaultEvent[]>([
    { name: 'Sleep', location: 'casa yaya', duration: 480 },
    { name: 'Lunch', location: 'casa yaya', duration: 30 },
    { name: 'Gym', location: '', duration: 90 },
    { name: 'Shower', location: 'Gym', duration: 30 },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<DefaultEvent | null>(null);

  useEffect(() => {
    requestCalendarPermissions();
  }, []);

  const requestCalendarPermissions = async () => {
    try {
      const auth = await RNCalendarEvents.requestPermissions();
      if (auth === 'authorized') {
        fetchCalendars();
      } else {
        Alert.alert(
          'Permission required',
          'This app needs calendar access to function properly.',
        );
      }
    } catch (error) {
      console.error('Error requesting calendar permissions:', error);
    }
  };

  const fetchCalendars = async () => {
    try {
      const fetchedCalendars = await RNCalendarEvents.findCalendars();
      const formattedCalendars = fetchedCalendars.map((cal) => ({
        id: cal.id,
        title: cal.title,
        isPrimary: cal.isPrimary,
      }));
      setCalendars(formattedCalendars);
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  const createEvent = async (
    event: DefaultEvent,
    calendarId: string,
    startTime: Date,
  ) => {
    try {
      const endTime = new Date(startTime.getTime() + event.duration * 60000);
      const eventTitle = event.location
        ? `${event.name} @ ${event.location}`
        : event.name;

      const eventId = await RNCalendarEvents.saveEvent(eventTitle, {
        calendarId: calendarId,
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
      });

      Alert.alert('Success', `Event "${eventTitle}" created successfully!`);
      setSelectedEvent(null);
      return eventId;
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <DefaultEventsList
        events={defaultEvents}
        onEventPress={(event: any) => setSelectedEvent(event)}
      />
      {selectedEvent && (
        <EventConfigurationCard
          event={selectedEvent}
          calendars={calendars}
          onCreateEvent={createEvent}
          onCancel={() => setSelectedEvent(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CalendarEventsManager;
