// CalendarEventsManager.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNCalendarEvents from 'react-native-calendar-events';
import DefaultEventsList from './DefaultEventsList';
import EventConfigurationCard from './EventConfigurationCard';
import AddDefaultEventCard from './AddDefaultEventCard';
import EditDefaultEventCard from './EditDefaultEventCard';
import { DefaultEvent, Calendar } from '../types';
import Snackbar from 'react-native-snackbar';
import { colors, layout, spacing, buttons } from '../styles/theme';

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
  const [editingEvent, setEditingEvent] = useState<DefaultEvent | null>(null);

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

  const handleDeleteDefaultEvent = (eventToDelete: DefaultEvent) => {
    const updatedEvents = defaultEvents.filter(
      (event) => event.name !== eventToDelete.name,
    );
    setDefaultEvents(updatedEvents);
    saveDefaultEvents(updatedEvents);
  };

  const handleEditDefaultEvent = (eventToEdit: DefaultEvent) => {
    setEditingEvent(eventToEdit);
  };

  const handleSaveEditedEvent = (updatedEvent: DefaultEvent) => {
    const updatedEvents = defaultEvents.map((event) =>
      event.name === updatedEvent.name ? updatedEvent : event,
    );
    setDefaultEvents(updatedEvents);
    saveDefaultEvents(updatedEvents);
    setEditingEvent(null);
    Snackbar.show({
      text: `Event "${updatedEvent.name}" updated successfully!`,
      duration: Snackbar.LENGTH_SHORT,
    });
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

      Snackbar.show({
        text: `Event "${eventTitle}" created successfully!`,
        duration: Snackbar.LENGTH_SHORT,
      });
      setSelectedEvent(null);
      return eventId;
    } catch (error) {
      console.error('Error creating event:', error);
      Snackbar.show({
        text: 'Failed to create event. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const renderTopContent = () => {
    const isDisabled =
      showAddEventCard || selectedEvent !== null || editingEvent !== null;
    return (
      <TouchableOpacity
        style={[styles.addButton, isDisabled && styles.disabledButton]}
        onPress={() => !isDisabled && setShowAddEventCard(true)}
        disabled={isDisabled}
      >
        <Text
          style={[
            styles.addButtonText,
            isDisabled && styles.disabledButtonText,
          ]}
        >
          Add New Default Event
        </Text>
      </TouchableOpacity>
    );
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

    if (editingEvent) {
      return (
        <EditDefaultEventCard
          event={editingEvent}
          calendars={calendars}
          onSaveEvent={handleSaveEditedEvent}
          onCancel={() => setEditingEvent(null)}
        />
      );
    }

    return (
      <DefaultEventsList
        events={defaultEvents}
        calendars={calendars}
        onEventPress={(event) => setSelectedEvent(event)}
        onDeleteEvent={handleDeleteDefaultEvent}
        onEditEvent={handleEditDefaultEvent}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>{renderTopContent()}</View>
      <View style={styles.bottomContent}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.container,
    padding: spacing.medium,
    justifyContent: 'space-between',
  },
  topContent: {
    flex: 1,
  },
  bottomContent: {},
  addButton: {
    ...buttons.secondary,
    marginBottom: spacing.large,
  },
  addButtonText: {
    ...buttons.secondaryText,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.surface,
    borderColor: colors.surface,
  },
  disabledButtonText: {
    color: colors.onSurfaceDisabled,
  },
});

export default CalendarEventsManager;
