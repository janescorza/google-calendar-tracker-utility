// useBaseEvents.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseEvent } from '../types';

export const useBaseEvents = () => {
  const loadBaseEvents = async (): Promise<BaseEvent[]> => {
    try {
      const storedEvents = await AsyncStorage.getItem('BaseEvents');
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
      console.error('Error loading base events:', error);
      return [];
    }
  };

  const saveBaseEvents = async (events: BaseEvent[]): Promise<void> => {
    try {
      await AsyncStorage.setItem('BaseEvents', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving base events:', error);
    }
  };

  return { loadBaseEvents, saveBaseEvents };
};
