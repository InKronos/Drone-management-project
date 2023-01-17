import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './screens/login/login.screen';
import HomeScreen from './screens/home/home.screen';
import RegisterScreen from "./screens/register/register.screen";
import AddDroneScreen from "./screens/addDrone/addDrone.screen";
import ShowDronesScreen from "./screens/showDrones/showDrones.screen";
import DroneScreen from "./screens/drone/drone.screen";
import ShowMissionsScreen from "./screens/showMissions/showMissions.screen";
import MissionScreen from "./screens/mission/mission.screen";
import createMissionScreen from "./screens/createMission/createMission.screen";


const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator
         initialRouteName="Login" 
         screenOptions={{
            headerShown: false
          }}>
            <Screen name="Login" component={LoginScreen}></Screen>
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="Home" component={HomeScreen}></Screen>
            <Screen name="addDrone" component={AddDroneScreen}></Screen>
            <Screen name="showDrones" component={ShowDronesScreen}></Screen>
            <Screen name="Drone" component={DroneScreen}></Screen>
            <Screen name="ShowMissions" component={ShowMissionsScreen}></Screen>
            <Screen name="Mission" component={MissionScreen}></Screen>
            <Screen name="CreateMission" component={createMissionScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
