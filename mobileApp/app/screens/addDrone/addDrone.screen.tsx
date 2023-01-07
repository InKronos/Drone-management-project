import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { List, Snackbar } from "react-native-paper";
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

    useEffect(() => {
        props.showLoading();
        props.getingDrones();
        DroneService.getDrones("positive").then(drones => {
            setDronesArray(drones);
            props.showDronesSuccess();
            props.hideLoading();
        }).catch(error => {
            props.showDronesFail(error);
        })
    }, []);


    return (
        <SafeAreaView>
            <HeaderComponent title="Connect Drone" hasBackButton={true} navigation={props.navigation}/>
            <View>
                { props.droneState.droneGetSuccess && dronesArray.map(drone =>
                     
                     <List.Item
                     title={drone.name}
                     description="Online"
                     left={props => <List.Icon {...props} icon="drone" />}
                     right={props => <List.Icon {...props} icon="plus" />}
                     />
                        
                )}
                { props.droneState.error ? 
                <Snackbar
                    duration={5000}
                    visible={true}
                    onDismiss={() => {}}>
                    {props.droneState.error}
                </Snackbar>
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