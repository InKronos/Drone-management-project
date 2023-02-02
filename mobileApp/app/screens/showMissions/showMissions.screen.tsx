import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Card, FAB, List, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import HeaderComponent from "../../components/header/header.component";
import { AppState } from "../../store/AppState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { missionLoading, showMisssionFail, showMisssionSuccess } from "../../store/mission/mission.action";
import { MissionState } from "../../store/mission/MissionState";
import { showMissionsStyle } from "./ShowMissions.style";
import { Mission } from "../../model/mission/Mission";
import MissionService from "../../services/MissionService";
import { LoginState } from "../../store/login/LoginState";

interface showDronesScreenProps {



    navigation: any;

    loadingState: LoadingState;
    missionState: MissionState;
    loginState: LoginState;

    missionLoading: Function;
    showMissionSuccess: Function;
    showMissionFail: Function;

    hideLoading: Function;
    showLoading: Function;
}




const ShowMissionsScreen = (props: showDronesScreenProps) => {

    const goToMissionScreen = (id: number) => props.navigation.navigate("Mission", { id: id});
    
    const refresh = () => props.missionLoading();

    const [missionArray, setMissionArray] = useState<Mission[]>([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);


    useEffect(() => {
        props.missionLoading();
    }, []);

    useEffect(() => {
        props.showLoading();
        if(props.missionState.missionLoading){
            MissionService.getUserMissions(props.loginState.userToken).then(missions => {
                setMissionArray(missions);
                props.showMissionSuccess();
                props.hideLoading();
                setRefreshing(false);
            }).catch(error => {
                props.showMissionSuccess(error);
                props.hideLoading();
                setRefreshing(false);
            })
        }
        else{
            props.hideLoading();
            setRefreshing(false);
        }
    }, [props.missionState.missionLoading, refreshing]);

   

    return (
        <SafeAreaView style={showMissionsStyle.content}>
            <HeaderComponent title="Your Missions" hasBackButton={true} navigation={props.navigation}/>
            <ScrollView 
                
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
                }>
                { props.missionState.missionGetSuccess && missionArray.map(mission =>
                     
                     <List.Item
                     key={mission.id}
                     title={"Mission: "+ new Date(mission.missionStart).toLocaleDateString('en-uk', {  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second:'2-digit' })}
                     onPress={() => goToMissionScreen(mission.id)}
                     description={
                        <>
                        Drone: {mission.drone?.droneName}
                        </>
                    }
                     left={props => <List.Icon 
                        {...props} 
                        icon="map-check-outline" 
                    />}
                     right={props => <List.Icon {...props} icon="eye" />}
                     />
                        
                )}
                { (props.missionState.error || missionArray.length === 0) && !props.missionState.missionLoading ? 
                <View style={showMissionsStyle.content}>
                    <Text style={showMissionsStyle.textContainer}>connection error</Text>
                    <Button
                        style={showMissionsStyle.button}
                        mode="outlined"
                        onPress={refresh}>
                        Reconnect</Button>
                </View>
            : null }
            
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    missionState: store.mission,
    loginState: store.login
})

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        missionLoading: missionLoading,
        showMissionSuccess: showMisssionSuccess,
        showMissionFail: showMisssionFail,
        hideLoading: hide,
        showLoading: show
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ShowMissionsScreen);