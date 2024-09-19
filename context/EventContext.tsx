import { createContext, ReactNode, useContext, useState } from "react"
import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";

export interface Note {
    id: number,
    text: string
}

export interface Event {
    id: number, 
    name: string,
    type: string, 
    date: Dayjs,
    desc?: string,
    notes?: Note[]
}

export interface EventContextCatalog {
    events?: Event[],
    addEvent?: (event: Event) => void,
    addNoteToEventById?: (note: Note, eventId: number) => void,
    getEventsList?: () => Event[],
    getEventById?: (id: number) => Event,
    getEventNotesById?: (eventId: number) => Note[],
    children?: ReactNode
}

export const EventContext = createContext<EventContextCatalog | undefined>(undefined);

export const useEventContext = () => {
    const context = useContext(EventContext);

    if(context === undefined){
        throw new Error("useEventContext must be used with EventContext.")
    }

    return context;
}

const EventContextProvider = ({ children }: EventContextCatalog) => {
    
    const [events, setEvents] = useState<Event[]>([])

    const addEvent = (event: Event) => {
        setEvents(prevEvents => [...prevEvents, event])
    }

    const addNoteToEventById = (note: Note, eventId: number) => {
        setEvents((prevEvents) => {
            return prevEvents.map((event) => {
                if(event.id === eventId){
                    return {
                        ...event,
                        notes: [...(event.notes || []), note]
                    }
                }
                return event;
            })
        })
    }

    const getEventsList = () => {
        return events;
    }

    const getEventById = (eventId: number) => {
        const event = events.find((event: Event) => event.id === eventId)
        return event;
    }

    const getEventNotesById = (eventId: number) => {
        const event = events.find((event: Event) => event.id === eventId);
        return event ? event.notes || [] : []
    }

    return (
        <EventContext.Provider value={{ events, addEvent, getEventsList, getEventById, addNoteToEventById, getEventNotesById }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContextProvider;