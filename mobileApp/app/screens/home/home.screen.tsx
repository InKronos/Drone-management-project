import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Card, FAB, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { HeaderComponent } from "../../components/header/header.component";
import { BestDrone } from "../../model/drone/BestDrone";
import { Drone } from "../../model/drone/Drone";
import DroneService from "../../services/DroneService";
import MissionService from "../../services/MissionService";
import { AppState } from "../../store/AppState";
import { getingDrones, showDronesFail, showDronesSuccess } from "../../store/drone/drone.actions";
import { DroneState } from "../../store/drone/DroneState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { LoginState } from "../../store/login/LoginState";
import { missionLoading, showMisssionFail, showMisssionSuccess } from "../../store/mission/mission.action";
import { homeStyle } from "./home.style";


interface homeScreenProps {
    navigation: any;


    loadingState: LoadingState;
    droneState: DroneState;
    loginState: LoginState;

    getingDrones: Function;
    showDronesSuccess: Function;
    showDronesFail: Function;

    hideLoading: Function;
    showLoading: Function;
}
const HomeScreen = (props: homeScreenProps) => {

    const goToAddDrone = () => props.navigation.navigate("addDrone");
    const goToShowDrones = () => props.navigation.navigate("showDrones");
    const goToShowMissions = () => props.navigation.navigate("ShowMissions");



    const [mostUsedDrone, setMostUsedDrone] = useState<BestDrone>();
    const [isMisson, setIsMission] = useState<boolean>(false);
    const [isDrone, setIsDrone] = useState<boolean>(false);

    useEffect(() => {props.getingDrones()}, []);

    useEffect(() => {
        if(props.droneState.droneLoading){
            console.log("hej");
            console.log(props.loginState.userToken);
            props.showLoading();
            DroneService.getMostUsedDrone(props.loginState.userToken).then(drone => {
                console.log(drone.droneName);
                if(drone.droneName !== null){
                    setIsDrone(true);
                    setMostUsedDrone(drone);
                }
                else{
                    setIsDrone(false);
                    props.showDronesSuccess();
                }
                    

                MissionService.getMission(props.loginState.userToken).then(isMission => {
                    setIsMission(isMission);
                    props.showDronesSuccess();
                    props.hideLoading();
                }).catch(error => {
                    props.showDronesFail(error);
                    props.hideLoading();
                });
            }).catch(error => {
                props.showDronesFail(error);
                props.hideLoading();
            });

            
        }
        else{
            props.hideLoading();
        }
    }, [props.droneState.droneLoading]);

    return(
        <SafeAreaView style={{flex: 1}}>
            <HeaderComponent title="Drone Managment" hasBackButton={false} navigation={props.navigation}/>
            <View style={homeStyle.content}>
                <Card>
                    <Card.Title title="Drones"/>
                    { props.droneState.droneGetSuccess && isDrone ? 
                        <Card.Content>
                        <Text>Most used drone: {mostUsedDrone?.droneName}</Text>
                        <Text>Completed missions: {mostUsedDrone?.missionCount}</Text>
                        <Button 
                            style={homeStyle.cardButton}
                            onPress={goToShowDrones} 
                            mode="outlined">
                            Show all drones
                        </Button>
                    </Card.Content>
                    : null }
                    { !props.droneState.droneLoading && !isDrone ? 
                        <Card.Content>
                            <Text style={homeStyle.textContainer}>no connected drones</Text>
                            <Button 
                                
                                onPress={goToAddDrone}
                                icon="plus" 
                                mode="outlined">
                                Add drone
                            </Button>
                        </Card.Content>
                    : null }
                    
                </Card>
                <Card style={homeStyle.card}>
                    <Card.Title title="Missions"/>
                    <Card.Content>
                        { isMisson ? 
                            <Button
                            onPress={goToShowMissions}
                            mode="outlined">
                            Show Missions
                            </Button>
                        :
                            <Text style={homeStyle.textContainer}>no missions</Text>

                        }
                    
                    </Card.Content>
                </Card>
            </View>
            <FAB
                onPress={() => {}}
                icon="help"
                style={homeStyle.fab}
                color={"white"}
            /> 
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    droneState: store.drone,
    missionState: store.mission,
    loginState: store.login
})

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        getingDrones: getingDrones,
        showDronesSuccess: showDronesSuccess,
        showDronesFail: showDronesFail,
        missionLoading: missionLoading,
        showMissionSuccess: showMisssionSuccess,
        showMissionFail: showMisssionFail,
        hideLoading: hide,
        showLoading: show
    }, dispatch)
)


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);