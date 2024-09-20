import React, { useRef, useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import Select from 'react-select';
import { GlobalStyles, SelectStyles } from "../styles/global";
import { Event, useEventContext } from "../context/EventContext";
import EventDisplay from "./EventDisplay";
import { Button } from "./ui/Button";

export interface EventOption {
    value: string;
    label: string;
}

const EventInput = () => {

    const EventContext = useEventContext()

    const eventId = useRef<number>(0)
    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<Dayjs | null>(null)
    const [type, setType] = useState<EventOption>({value: '', label: ''})
    const [desc, setDesc] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])
    const isValid = useRef(true)
    
    const toggleDesc = () => {
        if(type?.value === 'other'){
            return <TextInput onChangeText={(desc) => setDesc(desc)} placeholder="Describe your event..." style={GlobalStyles.textInput} />
        } else if(desc !== ""){
            setDesc("")
        }
        return null
    }

    const clearInput = () => {
        setName("")
        setDate(null)
        setType({value: '', label: ''})
        setDesc("")
    }

    const validateInput = () => {
        let errorList: string[] = []
        if(name === "" || name === null){
            errorList.push("Event name is required.")
        }
        if(type?.value === "" || type?.value === null){
            errorList.push("Please select a type.")
        } else if(type?.value === 'other'){
            if(desc === "" || desc === null){
                errorList.push("Description required with 'other' event.")
            }
        }
        if(date === null){
            errorList.push("Event date required.")
        }
        setErrors(errorList)
        if(errorList.length > 0){
            isValid.current = false
        } else {
            isValid.current = true
        }
    }
    
    const handleAddEvent = () => {
        validateInput()
        if(isValid.current){
            eventId.current++
            const UserEvent: Event = {
                id: eventId.current,
                name: name,
                type: type,
                date: date,
                desc: desc
            }
            EventContext.addEvent(UserEvent)
            clearInput()
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
        <View style={GlobalStyles.container}>
            {!isValid.current && errors.map((error) => <Text key={error} style={GlobalStyles.errorText}>{error}</Text>)}
            <TextInput onChangeText={(name) => setName(name)} placeholder="Name..." value={name} style={GlobalStyles.textInput} />

            <View style={{ width:'90%', margin: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker 
                            value={date} onChange={(date) => setDate(date)}  
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </View>
            
            <View style={{ width: '90%', margin: 5, zIndex: 100 }}>
                <Select onChange={(type: EventOption) => setType(type)} placeholder="Type..." options={eventTypes} value={type} styles={SelectStyles} />
            </View>
            {toggleDesc()}
            <Button title='Add' onPress={handleAddEvent} />
            <EventDisplay />
        </View>
    );
}

export default EventInput;