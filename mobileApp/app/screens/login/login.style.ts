import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const loginStyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#60a9f4"
    },
    view: {
        width: "80%"
    },
    cardTitle: {
        color: "rgb(0, 97, 163)",
        fontWeight: "bold"
    },
    cardButton: {
        margin: 2,
        marginRight: 0,
        marginLeft: 0
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