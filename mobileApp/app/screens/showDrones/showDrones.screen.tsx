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
import { useNavigation } from "@react-navigation/native";

interface showDronesScreenProps {



    navigation: any;

    loadingState: LoadingState;
    droneState: DroneState;


    getingDrones: Function;
    showDronesSuccess: Function;
    showDronesFail: Function;

    hideLoading: Function;
    showLoading: Function;
}




const ShowDronesScreen = (props: showDronesScreenProps) => {

    const navigation = useNavigation();
    const [droneId, setDroneId] = useState<number>();
    const goToDroneScreen = (id: number) => props.navigation.navigate("Drone", { id: id});
    const goToAddDroneScreen = () => props.navigation.navigate("addDrone");
    
    const [dronesArray, setDronesArray] = useState<Drone[]>([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getingDrones();
    }, []);


    useEffect(() => {
        props.showLoading();
        props.getingDrones();
    }, []);

    useEffect(() => {
        if(refreshing){
            DroneService.getUserDrones("positive").then(drones => {
                setDronesArray(drones);
                props.showDronesSuccess();
                props.hideLoading();
                setRefreshing(false);
            }).catch(error => {
                props.showDronesFail(error);
                props.hideLoading();
                setRefreshing(false);
            })
        }
        else{
            props.hideLoading();
            setRefreshing(false);
        }
    }, [props.droneState.droneLoading, refreshing]);

   

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
                     key={drone.name}
                     title={drone.name}
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
                { (props.droneState.error || dronesArray.length === 0) && !props.droneState.droneLoading ? 
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowDronesScreen);