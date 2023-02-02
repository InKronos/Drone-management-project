import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Avatar, Button, Card, Dialog, IconButton, List, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { Drone } from "../../model/drone/Drone";
import HeaderComponent from "../../components/header/header.component";
import DroneService from "../../services/DroneService";
import { AppState } from "../../store/AppState";
import { getingDrones, showDronesFail, showDronesSuccess } from "../../store/drone/drone.actions";
import { DroneState } from "../../store/drone/DroneState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { droneStyle } from "./drone.style";
import { LoginState } from "../../store/login/LoginState";
import { useIsFocused } from "@react-navigation/native";
import { batteriesForm } from "./drone.form";
import { Formik } from "formik";

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
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const disconnectDrone = () => {
        props.showLoading();
        DroneService.disconnectDrone(props.route.params.id, props.loginState.userToken).then(() => {
            props.navigation.navigate("showDrones");
            props.hideLoading();
        }).catch(error => {
            setSnacBar(true);
            props.hideLoading();
        })
    }
    const [visibleBatteries, setVisibleBatteries] = React.useState(false);

    const showDialogBatt = () => setVisibleBatteries(true);

    const hideDialogBatt = () => setVisibleBatteries(false);

    const changeBatteries = (batteriesForm: {chargedBatteriesNumber: string, batteries: string}) => {
        props.showLoading();
        DroneService.changeBatteries(props.route.params.id, parseInt(batteriesForm.chargedBatteriesNumber), parseInt(batteriesForm.batteries)).then(() => {
            props.hideLoading();
            props.getingDrones();
        }).catch(error => {
            setSnacBar(true);

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
                        <Text>Numbers of batteries fully charged: {drone?.numberOfChargedBatteries}/{drone?.numberOfBatteries}</Text>
                        <Button mode="outlined" style={droneStyle.button} onPress={showDialogBatt}>Change number of batteries</Button>
                        <Button mode="contained" style={droneStyle.errorButton} onPress={showDialog}>Disconnet</Button>

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
            <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Disconnecting drone</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Do you want disconnect drone from you?</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>No</Button>
                <Button onPress={disconnectDrone}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
                <Dialog visible={visibleBatteries} onDismiss={hideDialogBatt}>
                    <Dialog.Title>Verify</Dialog.Title>
                    <Formik
                        onSubmit={changeBatteries}
                     initialValues={{chargedBatteriesNumber: "", batteries: ""}}
                     validationSchema={batteriesForm}>
                        {({handleSubmit, handleChange, errors, setFieldTouched, touched}) => (
                            <>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Type Number of baterries</Text>
                        <TextInput
                        keyboardType='numeric'
                        label="Number of charged batteries"
                        onChangeText={handleChange('chargedBatteries')}
                        onFocus={() => setFieldTouched('chargedBatteries')}
                        maxLength={6}
                        />                      
                        {
                            touched.chargedBatteriesNumber && errors.chargedBatteriesNumber ?
                            <Text style={{color: 'red'}}>
                                {errors.chargedBatteriesNumber}
                            </Text>
                            : null
                        }
                         <TextInput
                        keyboardType='numeric'
                        label="Number of batteries"
                        onChangeText={handleChange('batteries')}
                        onFocus={() => setFieldTouched('batteries')}
                        maxLength={6}
                        />                      
                        {
                            touched.batteries && errors.batteries ?
                            <Text style={{color: 'red'}}>
                                {errors.batteries}
                            </Text>
                            : null
                        }
                            
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleSubmit}>Add</Button>
                    </Dialog.Actions>
                    </>
                        )}
                        
                    </Formik>
                </Dialog>
            </Portal>
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