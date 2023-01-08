import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const showDronesStyle = StyleSheet.create({
    content: {
        justifyContent: 'center',
        padding: 20
    },
    textContainer: {
        display: "flex",
        textAlign: "center",
        paddingBottom: "10%"
    },
    button: {
        marginLeft: "20%",
        marginRight: "20%"
    },
    offline: {
        color: theme.colors.error
    },
    online: {
        color: theme.colors.success
    }
})