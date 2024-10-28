// DefaultEventsList.tsx
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
import { colors, typography, spacing } from '../styles/theme';

const { height: screenHeight } = Dimensions.get('window');

interface DefaultEventsListProps {
  events: DefaultEvent[];
  calendars: Calendar[];
  onEventPress: (event: DefaultEvent) => void;
  onDeleteEvent: (event: DefaultEvent) => void;
  onEditEvent: (event: DefaultEvent) => void;
}

const DefaultEventsList: React.FC<DefaultEventsListProps> = ({
  events,
  calendars,
  onEventPress,
  onDeleteEvent,
  onEditEvent,
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
        style={styles.editButton}
        onPress={() => onEditEvent(item)}
      >
        <Icon name="edit" size={24} color={colors.onSurfaceSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePress(item)}
      >
        <Icon name="delete" size={24} color={colors.onSurfaceSecondary} />
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
    marginBottom: spacing.large,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.medium,
  },
  list: {
    maxHeight: screenHeight * 0.6,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 5,
    marginBottom: spacing.medium,
  },
  eventContent: {
    flex: 1,
    padding: spacing.medium,
  },
  eventName: {
    ...typography.body,
    fontWeight: 'bold',
  },
  eventDuration: {
    ...typography.body,
    color: colors.onSurfaceSecondary,
  },
  editButton: {
    padding: spacing.medium,
  },
  deleteButton: {
    padding: spacing.medium,
  },
});

export default DefaultEventsList;
