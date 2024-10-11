import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultEvent, Calendar } from '../types';
import EventForm from './EventForm';
import TimeSelector from './TimeSelector';

interface EventConfigurationCardProps {
  event: DefaultEvent;
  calendars: Calendar[];
  onCreateEvent: (
    event: DefaultEvent,
    calendarId: string,
    startTime: Date,
  ) => void;
  onCancel: () => void;
}

const EventConfigurationCard: React.FC<EventConfigurationCardProps> = ({
  event,
  calendars,
  onCreateEvent,
  onCancel,
}) => {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [duration, setDuration] = useState((event.duration / 60).toString());
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    event.calendarId || calendars.find((cal) => cal.isPrimary)?.id || '',
  );
  const [startTime, setStartTime] = useState(new Date());

  const handleCreate = () => {
    const updatedEvent: DefaultEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60, // Convert hours to minutes
      calendarId: selectedCalendarId,
    };
    onCreateEvent(updatedEvent, selectedCalendarId, startTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Configuration</Text>

      <EventForm
        name={name}
        setName={setName}
        location={location}
        setLocation={setLocation}
        duration={duration}
        setDuration={setDuration}
        selectedCalendarId={selectedCalendarId}
        setSelectedCalendarId={setSelectedCalendarId}
        calendars={calendars}
      />

      <TimeSelector onTimeSelected={setStartTime} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={handleCreate}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  cancelButtonText: {
    color: '#6200ee',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#6200ee',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EventConfigurationCard;
