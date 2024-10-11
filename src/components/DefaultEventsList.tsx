// DefaultEventsList.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { DefaultEvent } from '../types.ts';

interface DefaultEventsListProps {
  events: DefaultEvent[];
  onEventPress: (event: DefaultEvent) => void;
}

const DefaultEventsList: React.FC<DefaultEventsListProps> = ({
  events,
  onEventPress,
}) => {
  const renderItem = ({ item }: { item: DefaultEvent }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => onEventPress(item)}
    >
      <Text style={styles.eventName}>
        {item.location ? `${item.name} @ ${item.location}` : item.name}
      </Text>
      <Text style={styles.eventDuration}>Default - {item.duration / 60}h</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Default Events</Text>
      <FlatList
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
  eventItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDuration: {
    fontSize: 14,
    color: '#666',
  },
});

export default DefaultEventsList;
