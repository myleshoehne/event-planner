import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import EventContextProvider from './context/EventContext';

export type RootStackParamList = {
  Home: undefined;
  EventDetails: { eventId: number, title: string };
}

export default function App() {

  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <EventContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen 
            name="EventDetails" 
            component={EventDetails} 
            options={({ route }) => ({
              title: route.params?.title || "Event Details"
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </EventContextProvider>
  );
}


