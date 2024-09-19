import { View, Text } from "react-native"
import { useEventContext } from "../context/EventContext"
import { NotesManager } from "../components/NotesManager";

interface EventDetialsProps {
    route: {
        params: {
            eventId: number;
            title: string;
        }
    }
}



export const EventDetails = ({ route }: EventDetialsProps) => {

    const { eventId } = route.params

    const EventContext = useEventContext()

    const event = EventContext.getEventById(eventId)

    return (
        <View>
            <Text>{event.name}</Text>
            <Text>{event.date.format('MM/DD/YYYY')}</Text>
            {event.type === 'Other' && <Text>{event.desc}</Text>}
            {event.type !== 'Other' && <Text>{event.type}</Text>}
            <NotesManager event={event} />
        </View>
    )
}

export default EventDetails;