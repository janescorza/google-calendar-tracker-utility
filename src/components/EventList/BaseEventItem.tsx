// BaseEventItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BaseEvent, Calendar } from '../../types';
import { colors, spacing, typography } from '../../styles/theme';
import { getCalendarName } from '../../utils/calendarUtils';

interface EventItemProps {
  event: BaseEvent;
  calendars: Calendar[];
  onEventPress: (event: BaseEvent) => void;
  onEditEvent: (event: BaseEvent) => void;
  onDeleteEvent: (event: BaseEvent) => void;
}

const BaseEventItem: React.FC<EventItemProps> = ({
  event,
  calendars,
  onEventPress,
  onEditEvent,
  onDeleteEvent,
}) => {
  const calendarName = getCalendarName(event.calendarId, calendars);

  const handleDeletePress = () => {
    onDeleteEvent(event);
  };

  return (
    <View style={styles.eventItem}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
        <Icon name="delete" size={24} color={colors.onSurfaceSecondary} />
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.eventContent}
        onPress={() => onEventPress(event)}
      >
        <Text style={styles.eventName}>
          {event.location ? `${event.name} @ ${event.location}` : event.name}
        </Text>
        <Text style={styles.eventDuration}>
          {calendarName} - {event.duration / 60}h
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => onEditEvent(event)}
      >
        <Icon name="edit" size={24} color={colors.onSurfaceSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 5,
    marginBottom: spacing.medium,
    paddingVertical: spacing.small,
  },
  deleteButton: {
    padding: spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 1,
    height: '80%',
    backgroundColor: colors.onSurfaceSecondary,
    marginRight: spacing.medium,
  },
  eventContent: {
    flex: 1,
    paddingVertical: spacing.small,
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BaseEventItem;
