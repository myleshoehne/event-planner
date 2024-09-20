import { Pressable, Text } from "react-native"
import { GlobalStyles } from "../../styles/global"

interface ButtonProps {
    title: string,
    onPress: () => void
}

export const Button = ({ title, onPress }: ButtonProps) => {
    return (
        <Pressable style={GlobalStyles.button} onPress={onPress}>
            <Text style={GlobalStyles.buttonText}>{title}</Text>
        </Pressable>
    )
}