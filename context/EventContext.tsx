import { createContext, ReactNode, useContext, useState } from "react"
import dayjs, { Dayjs } from "dayjs";
import { EventOption } from "../components/EventInput";

export interface Note {
    id: number,
    text: string
}

export interface Event {
    id: number, 
    name: string,
    type: EventOption, 
    date: Dayjs,
    desc?: string,
    notes?: Note[]
}

export interface EventContextCatalog {
    events?: Event[],
    addEvent?: (event: Event) => void,
    addNoteToEventById?: (note: Note, eventId: number) => void,
    deleteEventById?: (eventId: number) => void,
    getEventsList?: () => Event[],
    getEventById?: (id: number) => Event,
    getEventNotesById?: (eventId: number) => Note[],
    editEvent?: (event: Event) => void,
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

    const deleteEventById = (eventId: number) => {
        const modifiedEvents = events.filter((event: Event) => event.id !== eventId);
        setEvents(modifiedEvents);
    }

    const editEvent = (editedEvent: Event) => {
        setEvents((prevEvents) => {
            return prevEvents.map((event) => 
                event.id === editedEvent.id ? {...event, ...editedEvent} : event
            )
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
        <EventContext.Provider value={{ events, addEvent, getEventsList, getEventById, addNoteToEventById, getEventNotesById, deleteEventById, editEvent }}>
            {children}
        </EventContext.Provider>
    )
}

export default EventContextProvider;