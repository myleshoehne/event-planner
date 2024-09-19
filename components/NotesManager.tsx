
import { Button, TextInput, View, Text } from "react-native"
import { GlobalStyles } from "../styles/global"
import { useEffect, useRef, useState } from "react"
import { Note, Event, useEventContext } from "../context/EventContext"

interface NotesManagerProps {
    event: Event
}

export const NotesManager = ({ event }: NotesManagerProps) => {

    const EventContext = useEventContext()

    const noteId = useRef(0)
    const [note, setNote] = useState<string>("")
    const [errors, setErrors] = useState<string[]>([])
    const isValid = useRef(true)
    const [displayNotes, setDisplayNotes] = useState<Note[]>(EventContext.getEventNotesById(event.id))

    useEffect(() => {
        setDisplayNotes(EventContext.getEventNotesById(event.id))
    }, [EventContext])

    const validateInput = () => {
        const errorList: string[] = []
        if(note === "" || note === null){
            errorList.push("Must have text to create a note.")
            isValid.current = false
        } else {
            isValid.current = true
        }
        setErrors(errorList)
    }

    const handleAddNote = () => {
        validateInput()
        if(isValid){
            noteId.current++
            const userNote: Note = {
                id: noteId.current,
                text: note
            }
            EventContext.addNoteToEventById(userNote, event.id)
            setDisplayNotes(EventContext.getEventNotesById(event.id))
            setNote("")
        }
    }

    return (
        <View>
            {!isValid.current && errors.map((error) => <Text>{error}</Text>)}
            <TextInput value={note} onChangeText={(note) => setNote(note)} placeholder="Add note..." style={GlobalStyles.textInput} />
            <Button title='Add' onPress={handleAddNote} />
            <View>
                {displayNotes.length > 0 &&
                    displayNotes.map((note) => <Text key={note.id}>{note.text}</Text>)
                }
            </View>
        </View>
    )
}