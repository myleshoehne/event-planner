import { View, Text, ScrollView } from "react-native"
import { useEventContext } from "../context/EventContext";
import EventCard from "./ui/EventCard";
import { CardStyles, GlobalStyles, ScrollViewStyles } from "../styles/global";

export const EventDisplay = () => {

    const EventContext = useEventContext()
    
    return (
        <View style={CardStyles.container}>
            <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                {EventContext.events.length > 0 && EventContext.events.map((event) => <EventCard event={event} />)}
                {EventContext.events.length <= 0 && (<Text style={GlobalStyles.displayText}>Add an event to see future events.</Text>)}
            </ScrollView>
        </View>
    )
}

export default EventDisplay;