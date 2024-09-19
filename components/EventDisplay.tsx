import { View, Text } from "react-native"
import { useEventContext } from "../context/EventContext";
import EventCard from "./ui/EventCard";

export const EventDisplay = () => {

    const EventContext = useEventContext()

    return (
        <View>
            {EventContext.events.length > 0 && EventContext.events.map((event) => <EventCard event={event} />)}
            {EventContext.events.length <= 0 && (<Text>Add an event to see future events.</Text>)}
        </View>
    )
}

export default EventDisplay;