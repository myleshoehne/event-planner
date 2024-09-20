import { Pressable, Text } from "react-native"
import { GlobalStyles } from "../../styles/global"

interface ButtonProps {
    title: string,
    onPress: () => void
}

export const ButtonSmall = ({ title, onPress }: ButtonProps) => {
    return (
        <Pressable style={GlobalStyles.smallButton} onPress={onPress}>
            <Text style={GlobalStyles.buttonText}>{title}</Text>
        </Pressable>
    )
}