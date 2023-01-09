import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const missionStyle = StyleSheet.create({
    content: {
        flex: 1
    },

    fab: {
        position: "absolute",
        margin: 5,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        backgroundColor: theme.colors.primary,
        color: "white"
    },

    missionDetails: {
        height: 500,
        position: "absolute",
    }
});