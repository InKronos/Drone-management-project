import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Card, FAB, List, Snackbar, Text } from "react-native-paper";
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
import { showDronesStyle } from "./showDrones.style";
import { LoginState } from "../../store/login/LoginState";

interface showDronesScreenProps {



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




const ShowDronesScreen = (props: showDronesScreenProps) => {

    const goToDroneScreen = (id: number) => props.navigation.navigate("Drone", { id: id});
    const goToAddDroneScreen = () => props.navigation.navigate("addDrone");
    
    const [dronesArray, setDronesArray] = useState<Drone[]>([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);


    useEffect(() => {
        console.log("123");
        props.getingDrones();
    }, []);

    useEffect(() => {
        if(refreshing){
            DroneService.getUserDrones(props.loginState.userToken).then(drones => {
                setDronesArray(drones);
                props.showDronesSuccess();
                setRefreshing(false);
            }).catch(error => {
                props.showDronesFail(error);
                setRefreshing(false);
            })
        }
        else{
            setRefreshing(false);
        }
    }, [refreshing]);

    useEffect(() => {
        props.showLoading();
        DroneService.getUserDrones(props.loginState.userToken).then(drones => {
            setDronesArray(drones);
            props.showDronesSuccess();
            props.hideLoading();
        }).catch(error => {
            props.showDronesFail(error);
            props.hideLoading();
        })
        
    
    }, [props.droneState.droneLoading]);

   

    return (
        <SafeAreaView style={showDronesStyle.content}>
            <HeaderComponent title="Your Drones" hasBackButton={true} navigation={props.navigation}/>
            <ScrollView 
                
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
                }>
                { props.droneState.droneGetSuccess && dronesArray.map(drone =>
                     
                     <List.Item
                     key={drone.id}
                     title={drone.droneName}
                     onPress={() => goToDroneScreen(drone.id)}
                     description={
                        <>{drone.isOnline ? <Text style={showDronesStyle.online}>Online</Text> : <Text style={showDronesStyle.offline}>Offline</Text>}</>
                    }
                     left={props => <List.Icon 
                        {...props} 
                        icon="drone" 
                    />}
                     right={props => <List.Icon {...props} icon="eye" />}
                     />
                        
                )}
                { (props.droneState.error || dronesArray.length === 0) ? 
                <View style={showDronesStyle.content}>
                    <Text style={showDronesStyle.textContainer}>No drones found or connection error</Text>
                    <Button
                        style={showDronesStyle.button}
                        mode="outlined"
                        onPress={onRefresh}>
                        Reconnect</Button>
                </View>
            : null }
            
            </ScrollView>
            <FAB
                onPress={goToAddDroneScreen}
                icon="plus"
                style={showDronesStyle.fab}
                color={"white"}
            /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowDronesScreen);