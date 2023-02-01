import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Avatar, Button, Card, IconButton, List, Snackbar, Text } from "react-native-paper";
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
import { droneStyle } from "./drone.style";
import { LoginState } from "../../store/login/LoginState";
import loadingComponent from "../../components/loading/loading.component";
import { useIsFocused } from "@react-navigation/native";

interface droneScreenProps {
    navigation: any;
    route: any;

    loadingState: LoadingState;
    droneState: DroneState;
    loginState: LoginState;


    getingDrones: Function;
    showDronesSuccess: Function;
    showDronesFail: Function;

    hideLoading: Function;
    showLoading: Function;
}




const DroneScreen = (props: droneScreenProps) => {

    const [drone, setDrone] = useState<Drone>();

    const [refreshing, setRefreshing] = React.useState(false);

    const [snackBar, setSnacBar] = useState(false);
    const onRefresh = () => props.getingDrones();

    const goToCreateMissionScreen = (id: number, long: number, lat: number) => props.navigation.navigate("CreateMission", { id: id, long, lat});


    const disconnectDrone = () => {
        props.showLoading();
        DroneService.disconnectDrone(props.route.params.id, props.loginState.userToken).then(() => {
            props.navigation.navigate("showDrones");
            props.hideLoading();
            setSnacBar(true);
        }).catch(error => {
            props.hideLoading();
        })
    }
    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused && props.getingDrones();
    }, [isFocused]);

    useEffect(() => {
        props.showLoading()
        if(props.droneState.droneLoading){
            console.log(props.route);
            DroneService.getDrone(props.route.params.id).then(drone => {
                console.log(props.route);
                setDrone(drone);
                console.log(drone);
                props.showDronesSuccess();
            
                //.hideLoading();
                setRefreshing(false);
            }).catch(error => {
                props.showDronesFail(error);
                //props.hideLoading();
                setRefreshing(false);
            })
        }
        else{
            //props.hideLoading();
            setRefreshing(false);
        }
    }, [props.droneState.droneLoading]);


    return (
        <SafeAreaView>
            
            <HeaderComponent title="Drone" hasBackButton={true} navigation={props.navigation}/>
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
                }>
            { (props.droneState.droneGetSuccess && drone !== null && drone !== undefined) ? 
            
                <>
                <View style={droneStyle.content}>
                    <View>
                        <Avatar.Icon size={120} icon="drone" style={droneStyle.profileImage}></Avatar.Icon>
                        { drone?.isOnline ? <View style={droneStyle.active}></View> : <View style={droneStyle.offline}></View>}
                    </View>
                    <View style={droneStyle.textContainer}>
                        <Text style={droneStyle.nameOfDrone}>{drone?.droneName}</Text>
                        <Text>Missions complited: {drone?.numberOfFinishedMissions}</Text>
                        <Text>Numbers of batteries fully charged: 1/2{drone?.numberOfChargedBatteries}{drone?.numberOfBatteries}</Text>
                        <Button mode="outlined" style={droneStyle.button} onPress={() => goToCreateMissionScreen(drone.id, drone.longitude, drone.latitude)}>Change number of batteries</Button>
                        <Button mode="contained" style={droneStyle.errorButton} onPress={disconnectDrone}>Disconnet</Button>

                    </View>
                    {
                        drone.isOnline ? 
                        <Button mode="contained" style={droneStyle.button} onPress={() => goToCreateMissionScreen(drone.id, drone.longitude, drone.latitude)}>Create mission</Button>
                        : null
                    }
                </View>
                </>
            : null}
            <Snackbar
                    duration={5000}
                    visible={snackBar}
                    onDismiss={()=>setSnacBar(false)}>
                    {"Error"}
            </Snackbar>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    droneState: store.drone,
    loginState: store.login
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

export default connect(mapStateToProps, mapDispatchToProps)(DroneScreen);