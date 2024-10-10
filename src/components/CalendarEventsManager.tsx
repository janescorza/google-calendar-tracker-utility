import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { Picker } from '@react-native-picker/picker';

interface DefaultEvent {
  name: string;
  location: string;
  duration: number; // in minutes
}

interface Calendar {
  id: string;
  title: string;
  isPrimary: boolean;
}

const CalendarEventsManager: React.FC = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState<string>('');
  const [defaultEvents, setDefaultEvents] = useState<DefaultEvent[]>([
    { name: 'Sleep', location: 'casa yaya', duration: 480 },
    { name: 'Lunch', location: 'casa yaya', duration: 60 },
    { name: 'Gym', location: '', duration: 90 },
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

      const primaryCalendar = formattedCalendars.find((cal) => cal.isPrimary);
      if (primaryCalendar) {
        setSelectedCalendarId(primaryCalendar.id);
      }
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  const createEvent = async (event: DefaultEvent) => {
    try {
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + event.duration * 60000);
      const eventTitle = event.location
        ? `${event.name} @ ${event.location}`
        : event.name;

      const eventId = await RNCalendarEvents.saveEvent(eventTitle, {
        calendarId: selectedCalendarId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      Alert.alert('Success', `Event "${eventTitle}" created successfully!`);
      return eventId;
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    }
  };

  const handleEventPress = (event: DefaultEvent) => {
    setSelectedEvent(event);
  };

  const handleUpdateEvent = (updatedEvent: DefaultEvent) => {
    setDefaultEvents((prev) =>
      prev.map((e) => (e.name === updatedEvent.name ? updatedEvent : e)),
    );
    setSelectedEvent(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Calendar</Text>
      <Picker
        selectedValue={selectedCalendarId}
        onValueChange={(itemValue) => setSelectedCalendarId(itemValue)}
      >
        {calendars.map((calendar) => (
          <Picker.Item
            key={calendar.id}
            label={calendar.title}
            value={calendar.id}
          />
        ))}
      </Picker>

      <Text style={styles.title}>Quick Add Events</Text>
      {defaultEvents.map((event) => (
        <Button
          key={event.name}
          title={
            event.location ? `${event.name} @ ${event.location}` : event.name
          }
          onPress={() => createEvent(event)}
        />
      ))}

      <Text style={styles.title}>Customize Events</Text>
      {defaultEvents.map((event) => (
        <Button
          key={event.name}
          title={`Edit ${event.name}`}
          onPress={() => handleEventPress(event)}
        />
      ))}

      {selectedEvent && (
        <View style={styles.editForm}>
          <Text style={styles.subtitle}>Edit {selectedEvent.name}</Text>
          <TextInput
            style={styles.input}
            value={selectedEvent.location}
            onChangeText={(text) =>
              setSelectedEvent({ ...selectedEvent, location: text })
            }
            placeholder="Location (optional)"
          />
          <TextInput
            style={styles.input}
            value={selectedEvent.duration.toString()}
            onChangeText={(text) =>
              setSelectedEvent({
                ...selectedEvent,
                duration: parseInt(text) || 0,
              })
            }
            placeholder="Duration (minutes)"
            keyboardType="numeric"
          />
          <Button
            title="Update"
            onPress={() => handleUpdateEvent(selectedEvent)}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  editForm: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default CalendarEventsManager;
