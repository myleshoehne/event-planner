import { View, Text, Pressable } from "react-native";
import { CardStyles } from "../../styles/global";
import { Event } from "../../context/EventContext";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../App";
import { NotesManager } from "../NotesManager";

interface EventCardProps {
    event: Event
}

export const EventCard = ({ event }: EventCardProps) => {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleEventCardClick = (eventId: number, title: string) => {
        navigation.navigate('EventDetails', { eventId, title });
    }

    return (
        <View style={CardStyles.box}>
            <Pressable key={event.id} onPress={() => handleEventCardClick(event.id, event.name)}>
                <Text style={CardStyles.eventName}>{event.name}</Text>
                <Text style={CardStyles.eventDate}>{event.date.format('DD/MM/YYYY')}</Text>
                {event.type === 'Other' && <Text style={CardStyles.eventType}>{event.desc}</Text>}
                {event.type !== 'Other' && <Text style={CardStyles.eventType}>{event.type}</Text>}
            </Pressable>
        </View>
    )
}

export default EventCard;