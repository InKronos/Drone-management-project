import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const homeStyle = StyleSheet.create({
    content: {
        justifyContent: 'center',
        padding: 20
    },
    textContainer: {
        display: "flex",
        textAlign: "center",
        paddingBottom: "10%"
    },
    card: {
        marginTop: 20
    },
    cardButton: {
        marginTop: 20,
        marginRight: "20%",
        marginLeft: "20%",
        marginBottom: 2
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