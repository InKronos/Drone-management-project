import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const editUserStyle = StyleSheet.create({
    content : {
        padding: 12,
        paddingTop: 0
    },
    icon: {
        color: theme.colors.primary
    },
    button: {
        margin: 15,
        marginLeft: 0,
        marginRight: 0
    }
})