import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const showDronesStyle = StyleSheet.create({
    content: {
        flex: 1
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
    },
    fab: {
    
        position: "absolute",
        margin: 5,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        backgroundColor: theme.colors.primary,
        color: "white"
    }
})