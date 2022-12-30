import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderComponent } from "../../components/header.components";

export const HomeScreen = () => {
    return(
        <SafeAreaView>
            <HeaderComponent title="Drone Managment" hasBackButton={false}/>
            <Text>Strona główna xd</Text>
        </SafeAreaView>
    )
}