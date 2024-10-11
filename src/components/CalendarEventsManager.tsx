import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNCalendarEvents from 'react-native-calendar-events';
import DefaultEventsList from './DefaultEventsList';
import EventConfigurationCard from './EventConfigurationCard';
import AddDefaultEventCard from './AddDefaultEventCard';
import { DefaultEvent, Calendar } from '../types';

const CalendarEventsManager: React.FC = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [showAddEventCard, setShowAddEventCard] = useState(false);
  const [defaultEvents, setDefaultEvents] = useState<DefaultEvent[]>([
    { name: 'Sleep', location: 'casa yaya', duration: 480, calendarId: '' },
    { name: 'Lunch', location: 'casa yaya', duration: 30, calendarId: '' },
    { name: 'Gym', location: '', duration: 60, calendarId: '' },
    { name: 'Shower', location: 'Gym', duration: 30, calendarId: '' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<DefaultEvent | null>(null);

  useEffect(() => {
    requestCalendarPermissions();
    loadDefaultEvents();
  }, []);

  const loadDefaultEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('defaultEvents');
      if (storedEvents) {
        setDefaultEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading default events:', error);
    }
  };

  const saveDefaultEvents = async (events: DefaultEvent[]) => {
    try {
      await AsyncStorage.setItem('defaultEvents', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving default events:', error);
    }
  };

  const handleAddDefaultEvent = (newEvent: DefaultEvent) => {
    const updatedEvents = [...defaultEvents, newEvent];
    setDefaultEvents(updatedEvents);
    saveDefaultEvents(updatedEvents);
    setShowAddEventCard(false);
  };

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

  const renderContent = () => {
    if (selectedEvent) {
      return (
        <EventConfigurationCard
          event={selectedEvent}
          calendars={calendars}
          onCreateEvent={createEvent}
          onCancel={() => setSelectedEvent(null)}
        />
      );
    }

    if (showAddEventCard) {
      return (
        <AddDefaultEventCard
          calendars={calendars}
          onAddEvent={handleAddDefaultEvent}
          onCancel={() => setShowAddEventCard(false)}
        />
      );
    }

    return (
      <DefaultEventsList
        events={defaultEvents}
        onEventPress={(event) => setSelectedEvent(event)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddEventCard(true)}
        >
          <Text style={styles.addButtonText}>Add New Default Event</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContent}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {},
  addButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CalendarEventsManager;
