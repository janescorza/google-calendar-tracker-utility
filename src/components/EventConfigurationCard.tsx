// EventConfigurationCard.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DefaultEvent, Calendar } from '../types.ts';
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
      calendarId: selectedCalendarId, // Add this line
    };
    onCreateEvent(updatedEvent, selectedCalendarId, startTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Configuration</Text>
      <Text style={styles.label}>Event Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Location (optional)</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Text style={styles.label}>Duration (hours)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Calendar</Text>
      <Picker
        selectedValue={selectedCalendarId}
        onValueChange={(itemValue) => setSelectedCalendarId(itemValue)}
        style={styles.picker}
      >
        {calendars.map((calendar) => (
          <Picker.Item
            key={calendar.id}
            label={calendar.title}
            value={calendar.id}
          />
        ))}
      </Picker>
      <TimeSelector onTimeSelected={setStartTime} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
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
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    marginBottom: 10,
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
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: '#6200ee',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EventConfigurationCard;
