import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DefaultEvent, Calendar } from '../types';

const { height: screenHeight } = Dimensions.get('window');

interface DefaultEventsListProps {
  events: DefaultEvent[];
  calendars: Calendar[];
  onEventPress: (event: DefaultEvent) => void;
  onDeleteEvent: (event: DefaultEvent) => void;
}

const DefaultEventsList: React.FC<DefaultEventsListProps> = ({
  events,
  calendars,
  onEventPress,
  onDeleteEvent,
}) => {
  const getCalendarName = (calendarId: string) => {
    const calendar = calendars.find((cal) => cal.id === calendarId);
    return calendar ? calendar.title : 'Unknown Calendar';
  };

  const handleDeletePress = (event: DefaultEvent) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${event.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => onDeleteEvent(event),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const renderItem = ({ item }: { item: DefaultEvent }) => (
    <View style={styles.eventItem}>
      <TouchableOpacity
        style={styles.eventContent}
        onPress={() => onEventPress(item)}
      >
        <Text style={styles.eventName}>
          {item.location ? `${item.name} @ ${item.location}` : item.name}
        </Text>
        <Text style={styles.eventDuration}>
          {getCalendarName(item.calendarId)} - {item.duration / 60}h
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePress(item)}
      >
        <Icon name="delete" size={24} color="#d3d3d3" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default Events</Text>
      <FlatList
        style={styles.list}
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    maxHeight: screenHeight * 0.6,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  eventContent: {
    flex: 1,
    padding: 15,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDuration: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    padding: 15,
  },
});

export default DefaultEventsList;
