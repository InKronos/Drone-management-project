import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderComponent } from "../../components/header.components";


interface homeScreenProps {
    navigation: any;
}
export const HomeScreen = (props: homeScreenProps) => {
    return(
        <SafeAreaView>
            <HeaderComponent title="Drone Managment" hasBackButton={false} navigation={props.navigation}/>
            <Text>Strona główna xd</Text>
        </SafeAreaView>
    )
}