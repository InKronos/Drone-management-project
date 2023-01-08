import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Card, List, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { Drone } from "../../model/drone/Drone";
import { HeaderComponent } from "../../components/header/header.component";
import DroneService from "../../services/DroneService";
import { AppState } from "../../store/AppState";
import { getingDrones, showDronesFail, showDronesSuccess } from "../../store/drone/drone.actions";
import { DroneState } from "../../store/drone/DroneState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { addDroneStyle } from "./addDrone.style";

interface addDroneScreenProps {
    navigation: any;

    loadingState: LoadingState;
    droneState: DroneState;


    getingDrones: Function;
    showDronesSuccess: Function;
    showDronesFail: Function;

    hideLoading: Function;
    showLoading: Function;
}

const AddDroneScreen = (props: addDroneScreenProps) => {

    const [dronesArray, setDronesArray] = useState<Drone[]>([]);

    const connectToServer = () => props.getingDrones();

    useEffect(() => {props.getingDrones()}, []);

    useEffect(() => {
        if(props.droneState.droneLoading){
            props.showLoading();
            DroneService.getDrones("positive").then(drones => {
                setDronesArray(drones);
                props.showDronesSuccess();
                props.hideLoading();
            }).catch(error => {
                props.showDronesFail(error);
                props.hideLoading();
            })
        }
        else{
            props.hideLoading();
        }
    }, [props.droneState.droneLoading]);


    return (
        <SafeAreaView>
            <HeaderComponent title="Connect Drone" hasBackButton={true} navigation={props.navigation}/>
            <View >
                { props.droneState.droneGetSuccess && dronesArray.map(drone =>
                     
                     <List.Item
                     key={drone.name}
                     title={drone.name}
                     description="Online"
                     left={props => <List.Icon {...props} icon="drone" />}
                     right={props => <List.Icon {...props} icon="plus" />}
                     />
                        
                )}
                { (props.droneState.error || dronesArray.length === 0) && !props.droneState.droneLoading ? 
                <View style={addDroneStyle.content}>
                    <Text style={addDroneStyle.textContainer}>No drones found or connection error</Text>
                    <Button
                        style={addDroneStyle.button}
                        mode="outlined"
                        onPress={connectToServer}>
                        Reconnect</Button>
                </View>
            : null }
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    droneState: store.drone
})

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        getingDrones: getingDrones,
        showDronesSuccess: showDronesSuccess,
        showDronesFail: showDronesFail,
        hideLoading: hide,
        showLoading: show
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AddDroneScreen);