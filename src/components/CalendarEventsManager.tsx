// CalendarEventsManager.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import BaseEventsList from './EventList/BaseEventsList';
import EventInstanceCreationCard from './Cards/EventInstanceCreationCard';
import AddBaseEventCard from './Cards/AddBaseEventCard';
import EditBaseEventCard from './Cards/EditBaseEventCard';
import { BaseEvent } from '../types';
import { colors, layout, spacing, buttons } from '../styles/theme';
import { useBaseEvents } from '../hooks/useBaseEvents';
import { showSnackbar } from '../utils/showSnackbar';
import { useCalendarPermissions } from '../hooks/useCalendarPermissions';
import { initialBaseEvents } from '../config/BaseEventsConfig';

const CalendarEventsManager: React.FC = () => {
  const { loadBaseEvents, saveBaseEvents } = useBaseEvents();
  const { calendars, requestCalendarPermissions } = useCalendarPermissions();
  const [modalState, setModalState] = useState<'ADD' | 'VIEW' | 'EDIT' | null>(
    null,
  );
  const [eventInFocus, setEventInFocus] = useState<BaseEvent | null>(null);
  const [BaseEvents, setBaseEvents] = useState<BaseEvent[]>([]);

  useEffect(() => {
    requestCalendarPermissions();
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const events = await loadBaseEvents();
    setBaseEvents(events.length ? events : initialBaseEvents);
  };

  const handleAddBaseEvent = (newEvent: BaseEvent) => {
    updateBaseEvents([...BaseEvents, newEvent]);
    setModalState(null);
  };

  const handleDeleteBaseEvent = (eventToDelete: BaseEvent) => {
    const updatedEvents = BaseEvents.filter(
      (event) => event.name !== eventToDelete.name,
    );
    updateBaseEvents(updatedEvents);
    showSnackbar(`Event "${eventToDelete.name}" deleted successfully!`);
  };

  const handleSaveEditedEvent = (updatedEvent: BaseEvent) => {
    const updatedEvents = BaseEvents.map((event) =>
      event.name === updatedEvent.name ? updatedEvent : event,
    );
    updateBaseEvents(updatedEvents);
    setModalState(null);
    showSnackbar(`Event "${updatedEvent.name}" updated successfully!`);
  };

  const updateBaseEvents = (events: BaseEvent[]) => {
    setBaseEvents(events);
    saveBaseEvents(events);
  };

  const createEvent = async (
    event: BaseEvent,
    calendarId: string,
    startTime: Date,
  ) => {
    try {
      const endTime = new Date(startTime.getTime() + event.duration * 60000);
      const eventTitle = event.location
        ? `${event.name} @ ${event.location}`
        : event.name;
      const eventId = await RNCalendarEvents.saveEvent(eventTitle, {
        calendarId,
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
      });
      showSnackbar(`Event "${eventTitle}" created successfully!`);
      setModalState(null);
      return eventId;
    } catch (error) {
      console.error('Error creating event:', error);
      showSnackbar('Failed to create event. Please try again.', true);
    }
  };

  const renderContent = () => {
    if (modalState === 'VIEW' && eventInFocus) {
      return (
        <EventInstanceCreationCard
          event={eventInFocus}
          calendars={calendars}
          onCreateEvent={createEvent}
          onCancel={() => setModalState(null)}
        />
      );
    }
    if (modalState === 'ADD') {
      return (
        <AddBaseEventCard
          calendars={calendars}
          onAddEvent={handleAddBaseEvent}
          onCancel={() => setModalState(null)}
        />
      );
    }
    if (modalState === 'EDIT' && eventInFocus) {
      return (
        <EditBaseEventCard
          event={eventInFocus}
          calendars={calendars}
          onSaveEvent={handleSaveEditedEvent}
          onCancel={() => setModalState(null)}
        />
      );
    }
    return (
      <BaseEventsList
        events={BaseEvents}
        calendars={calendars}
        onEventPress={(event) => {
          setModalState('VIEW');
          setEventInFocus(event);
        }}
        onDeleteEvent={handleDeleteBaseEvent}
        onEditEvent={(event) => {
          setModalState('EDIT');
          setEventInFocus(event);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.addButton, modalState && styles.disabledButton]}
        onPress={() => !modalState && setModalState('ADD')}
        disabled={!!modalState}
      >
        <Text
          style={[
            styles.addButtonText,
            modalState && styles.disabledButtonText,
          ]}
        >
          Add New Base Event
        </Text>
      </TouchableOpacity>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.container,
    padding: spacing.medium,
    justifyContent: 'space-between',
  },
  addButton: { ...buttons.secondary, marginBottom: spacing.large },
  addButtonText: { ...buttons.secondaryText, fontWeight: 'bold' },
  disabledButton: {
    backgroundColor: colors.surface,
    borderColor: colors.surface,
  },
  disabledButtonText: { color: colors.onSurfaceDisabled },
});

export default CalendarEventsManager;
