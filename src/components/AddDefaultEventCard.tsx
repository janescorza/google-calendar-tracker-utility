import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DefaultEvent, Calendar } from '../types';

interface AddDefaultEventCardProps {
  calendars: Calendar[];
  onAddEvent: (event: DefaultEvent) => void;
  onCancel: () => void;
}

const AddDefaultEventCard: React.FC<AddDefaultEventCardProps> = ({
  calendars,
  onAddEvent,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedCalendarId, setSelectedCalendarId] = useState(
    calendars.find((cal) => cal.isPrimary)?.id || '',
  );

  const isFormValid = useMemo(() => {
    const durationValue = parseFloat(duration);
    return name.trim() !== '' && !isNaN(durationValue) && durationValue > 0;
  }, [name, duration]);

  const handleAdd = () => {
    if (!isFormValid) return;

    const newEvent: DefaultEvent = {
      name,
      location,
      duration: parseFloat(duration) * 60, // Convert hours to minutes
      calendarId: selectedCalendarId,
    };
    onAddEvent(newEvent);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Default Event</Text>

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
        <Text style={styles.label}>Default Calendar</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.createButton,
            !isFormValid && styles.disabledButton,
          ]}
          onPress={handleAdd}
          disabled={!isFormValid}
        >
          <Text style={styles.addButtonText}>Add</Text>
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
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  createButton: {
    backgroundColor: '#6200ee',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#6200ee',
    textAlign: 'center',
  },
  addButtonText: {
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

export default AddDefaultEventCard;
