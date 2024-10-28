// BaseEventsList.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Dimensions,
} from 'react-native';
import { BaseEvent, Calendar } from '../../types';
import BaseEventItem from './BaseEventItem';
import { typography, spacing } from '../../styles/theme';

const { height: screenHeight } = Dimensions.get('window');

interface BaseEventsListProps {
  events: BaseEvent[];
  calendars: Calendar[];
  onEventPress: (event: BaseEvent) => void;
  onDeleteEvent: (event: BaseEvent) => void;
  onEditEvent: (event: BaseEvent) => void;
}

const BaseEventsList: React.FC<BaseEventsListProps> = ({
  events,
  calendars,
  onEventPress,
  onDeleteEvent,
  onEditEvent,
}) => {
  const handleDeleteConfirmation = (event: BaseEvent) => {
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

  const renderEventItem = ({ item }: { item: BaseEvent }) => (
    <BaseEventItem
      event={item}
      calendars={calendars}
      onEventPress={onEventPress}
      onEditEvent={onEditEvent}
      onDeleteEvent={() => handleDeleteConfirmation(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default Events</Text>
      <FlatList
        style={styles.list}
        data={events}
        renderItem={renderEventItem}
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
});

export default BaseEventsList;
