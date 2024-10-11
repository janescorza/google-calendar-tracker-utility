import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from '../types';

interface EventFormProps {
  name: string;
  setName: (name: string) => void;
  location: string;
  setLocation: (location: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  selectedCalendarId: string;
  setSelectedCalendarId: (id: string) => void;
  calendars: Calendar[];
}

const EventForm: React.FC<EventFormProps> = ({
  name,
  setName,
  location,
  setLocation,
  duration,
  setDuration,
  selectedCalendarId,
  setSelectedCalendarId,
  calendars,
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location (optional)</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration (hours)</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EventForm;
