import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Card, FAB, List, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { HeaderComponent } from "../../components/header/header.component";
import { AppState } from "../../store/AppState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { missionLoading, showMisssionFail, showMisssionSuccess } from "../../store/mission/mission.action";
import { MissionState } from "../../store/mission/MissionState";
import { showMissionStyle } from "./ShowMission.style";
import { Mission } from "../../model/mission/Mission";
import MissionService from "../../services/MissionService";

interface showDronesScreenProps {



    navigation: any;

    loadingState: LoadingState;
    missionState: MissionState;

    missionLoading: Function;
    showMissionSuccess: Function;
    showMissionFail: Function;

    hideLoading: Function;
    showLoading: Function;
}




const ShowMissionsScreen = (props: showDronesScreenProps) => {

    //const goToDroneScreen = (id: number) => props.navigation.navigate("Mission", { id: id});
    
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
            MissionService.getUserMissions().then(missions => {
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
        <SafeAreaView style={showMissionStyle.content}>
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
                     title={"Mission: "+ mission.date.toLocaleString()}
                     onPress={() => {}}
                     description={
                        <>
                        Drone: {mission.drone?.name}
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
                <View style={showMissionStyle.content}>
                    <Text style={showMissionStyle.textContainer}>connection error</Text>
                    <Button
                        style={showMissionStyle.button}
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
    missionState: store.mission
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