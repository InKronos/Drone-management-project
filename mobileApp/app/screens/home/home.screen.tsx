import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderComponent } from "../../components/header/header.component";
import { homeStyle } from "./home.style";


interface homeScreenProps {
    navigation: any;
}
const HomeScreen = (props: homeScreenProps) => {

    const goToAddDrone = () => props.navigation.navigate("addDrone")

    return(
        <SafeAreaView>
            <HeaderComponent title="Drone Managment" hasBackButton={false} navigation={props.navigation}/>
            <View style={homeStyle.content}>
                <Card>
                    <Card.Title title="Drones"/>
                    <Card.Content>
                        <Text style={homeStyle.textContainer}>no connected drones</Text>
                        <Button 
                            icon="plus" 
                            mode="outlined">
                            Add drone
                        </Button>
                    </Card.Content>
                </Card>
                <Card style={homeStyle.card}>
                    <Card.Title title="Missions"/>
                    <Card.Content>
                        <Text style={homeStyle.textContainer}>no missions</Text>
                    
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;