import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './screens/login/login.screen';
import HomeScreen from './screens/home/home.screen';
import RegisterScreen from "./screens/register/register.screen";
import AddDroneScreen from "./screens/addDrone/addDrone.screen";
import showDronesScreen from "./screens/showDrones/showDrones.screen";
import droneScreen from "./screens/Drone/drone.screen";


const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
         initialRouteName="Home" 
         screenOptions={{
            headerShown: false
          }}>
            <Screen name="Login" component={LoginScreen}></Screen>
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Home" component={HomeScreen}></Screen>
            <Screen name="addDrone" component={AddDroneScreen}></Screen>
            <Screen name="showDrones" component={showDronesScreen}></Screen>
            <Screen name="Drone" component={droneScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
