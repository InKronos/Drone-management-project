import { StyleSheet } from "react-native";
import { theme } from "../../../App.style";

export const droneStyle = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignSelf: "center",
        height: "100%"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 20
    },
    active: {
        backgroundColor: theme.colors.success,
        position: "absolute",
        bottom: 28,
        left: 55,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#000"
    },
    offline: {
        backgroundColor: theme.colors.error,
        position: "absolute",
        bottom: 110,
        left: 50,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#000"
    },
    textContainer:{ 
        justifyContent: "center"
    },
    nameOfDrone: {
        alignSelf: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    button:{
        marginTop: 20
    }
})