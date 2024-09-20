import { View, Text, TextInput } from "react-native"
import EventContextProvider, { useEventContext, Event } from "../context/EventContext"
import { NotesManager } from "../components/NotesManager";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { GlobalStyles } from "../styles/global";
import React, { useRef, useState } from "react";
import { Dayjs } from "dayjs";
import { EventOption } from "../components/EventInput"
import Select from 'react-select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from "../components/ui/Button";
import { ButtonSmall } from "../components/ui/ButtonSmall";

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

    const [isEditMode, setIsEditMode] = useState(false)
    const [editedName, setEditedName] = useState<string | null>(event?.name)
    const [editedDate, setEditedDate] = useState<Dayjs | null>(event?.date)
    const [editedType, setEditedType] = useState<EventOption>(event?.type || {value:"", label:""})
    const [editedDesc, setEditedDesc] = useState<string | null>(event?.desc)
    const [errors, setErrors] = useState<string[]>([])
    const isValid = useRef(true)

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleDelete = () => {
        navigation.navigate('Home');
        EventContext.deleteEventById(event.id)
    }

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    const toggleDesc = () => {
        if(editedType?.value === 'other'){
            return <TextInput value={editedDesc} onChangeText={(desc) => setEditedDesc(desc)} placeholder="Describe your event..." style={GlobalStyles.textInput} />
        } else if(editedDesc !== ""){
            setEditedDesc("")
        }
        return null
    }

    const validateInput = () => {
        let errorList: string[] = []
        if(editedName === "" || editedName === null){
            errorList.push("Event name is required.")
        }
        if(editedType?.value === "" || editedType?.value === null){
            errorList.push("Please select a type.")
        } else if(editedType?.value === 'other'){
            if(editedDesc === "" || editedDesc === null){
                errorList.push("Description required with 'other' event.")
            }
        }
        if(editedDate === null){
            errorList.push("Event date required.")
        }
        setErrors(errorList)
        if(errorList.length > 0){
            isValid.current = false
        } else {
            isValid.current = true
        }
    }

    const handleConfirmEdit = () => {
        validateInput()
        if(isValid.current){
            const editedEvent: Event = {
                id: eventId,
                name: editedName,
                type: editedType,
                date: editedDate,
                desc: editedDesc
            }
            EventContext.editEvent(editedEvent)
            toggleEditMode()
        } 
    }

    const eventTypes: EventOption[] = [
        { value: "", label: "" },
        { value: 'party', label: 'Party' },
        { value: 'meeting', label: 'Meeting' },
        { value: 'seminar', label: 'Seminar' },
        { value: 'Workshop', label: 'Workshop' },
        { value: 'corporateEvent', label: 'Corporate Event' },
        { value: 'training', label: 'Training' },
        { value: 'other', label: 'Other' },
    ]
    
    return (
        <View>
            {event && 
                <View>
                    {!isEditMode && 
                        <View>
                            <TextInput value={event.name} style={GlobalStyles.textInput} editable={false} />
                            <TextInput value={event.date.format('MM/DD/YYYY')} style={GlobalStyles.textInput} editable={false} />
                            {event.type.value === 'other' && <TextInput value={event.desc} style={GlobalStyles.textInput} editable={false} />}
                            {event.type.value !== 'other' && <TextInput value={event.type.label} style={GlobalStyles.textInput} editable={false} />}
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <ButtonSmall title="Edit" onPress={toggleEditMode} />
                                <ButtonSmall title="Delete" onPress={handleDelete} />
                            </View>
                            <NotesManager event={event} />
                        </View>
                    }
                    {isEditMode &&
                        <View>
                            {!isValid.current && errors.map((error) => <Text key={error} style={GlobalStyles.errorText}>{error}</Text>)}
                            <TextInput onChangeText={(name) => setEditedName(name)} placeholder="Name..." value={editedName} style={GlobalStyles.textInput} />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker value={editedDate} onChange={(date) => setEditedDate(date)} />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Select onChange={(type: EventOption) => setEditedType(type)} options={eventTypes} value={editedType} />
                            {toggleDesc()}
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <ButtonSmall title="Cancel" onPress={toggleEditMode} />
                                <ButtonSmall title="Confirm" onPress={handleConfirmEdit} />
                            </View>
                            <NotesManager event={event} />
                        </View>
                    }
                </View>
            }
            {!event &&
                <Text>No event to display. Event may have been deleted.</Text>
            }
            
        </View>
    )
}

export default EventDetails;