import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import EventInput from '../components/EventInput';
import { GlobalStyles } from '../styles/global';
import EventContextProvider from '../context/EventContext';
import EventDisplay from '../components/EventDisplay';
import EventDetails from './EventDetails';

export default function Home() {
  return (
      <EventInput />       
  );
}


