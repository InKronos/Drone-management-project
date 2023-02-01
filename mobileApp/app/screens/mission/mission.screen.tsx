import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import { Button, Card, FAB, List, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { HeaderComponent } from "../../components/header/header.component";
import { AppState } from "../../store/AppState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { missionLoading, showMisssionFail, showMisssionSuccess } from "../../store/mission/mission.action";
import { MissionState } from "../../store/mission/MissionState";
import { Mission } from "../../model/mission/Mission";
import MissionService from "../../services/MissionService";
import { missionStyle } from "./mission.style";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { floor } from "react-native-reanimated";

interface MissionScreenProps {

    navigation: any;
    route: any;

    loadingState: LoadingState;
    missionState: MissionState;

    missionLoading: Function;
    showMissionSuccess: Function;
    showMissionFail: Function;

    hideLoading: Function;
    showLoading: Function;
}




const MissionScreen = (props: MissionScreenProps) => {
    
    const onRegionChange = (region: Region) => {
        setRegion(region);
    }

    const changeRegion = () => setRegion(initialRegion);

    const refresh = () => props.missionLoading();

    const [mission, setMission] = useState<Mission>();

    const [refreshing, setRefreshing] = React.useState(false);

    const [region, setRegion] = useState<Region>();

    const [initialRegion, setInitialRegion] = useState<Region>();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);


    useEffect(() => {
        console.log("hello");
        console.log(region);
        props.missionLoading();
    }, []);


    const [inMission, setInMission] = useState(1);

    useEffect(() => {
        console.log(inMission);
        if(inMission !== 1){
            console.log(mission);
            if(mission?.missionEnd === undefined || mission.missionEnd === null){
                console.log("hello");
                setTimeout(() => {
                    MissionService.getMissionData(props.route.params.id, inMission).then(mission => {
                        setMission(mission);
                        setInMission(inMission + 1);
                    }).catch(error => {
                        console.log(error);
                    })
                }, 2000)
               
            }
        }

    }, [inMission]);

    useEffect(() => {
        props.showLoading();
        console.log(props.route.params.id);
        if(props.missionState.missionLoading){
            MissionService.getMissionData(props.route.params.id).then(mission => {
                setMission(mission);
                setInitialRegion({
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                    latitude:  mission.missionPath[0].latitude,
                    longitude: mission.missionPath[0].longitude
                });
                console.log(mission);
                setRegion(initialRegion);
                console.log("region");
                console.log(region);
                props.showMissionSuccess();
                props.hideLoading();

                changeRegion();
                setRefreshing(false);
                setInMission(2);
            }).catch(error => {
                props.showMissionFail(error);
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
        <SafeAreaView style={missionStyle.content}>
            <HeaderComponent title="Mission" hasBackButton={true} navigation={props.navigation}/>
            {
                (props.missionState.missionGetSuccess && mission?.missionPath !== undefined) ? 
                <MapView
                    style={{flex: 1}}
                    region={region}
                    initialRegion={initialRegion}
                    onRegionChangeComplete={onRegionChange}>
                    <Polyline
                        coordinates={
                            mission.missionPath
                        }
                        strokeColor="#000"
                        fillColor="rgba(255,0,0,0.5)"
                        strokeWidth={2}
                        />
                    <Marker
                        description="Start"
                        coordinate={mission.missionPath[0]}/>
                    { mission?.missionEnd !== undefined && mission?.missionEnd !== null ? 
                        <Marker
                        description="drone"
                        coordinate={mission.missionPath[mission.missionPath.length - 1]}/>
                    :
                        <Marker
                        anchor={{x: 0.5, y: 0.5}}
                        description="End"
                        coordinate={mission.missionPath[mission.missionPath.length - 1]}
                        >
                            <Image
                            style={missionStyle.markerImage}
                            source={require("../../../assets/drone.png")}
                            />
                        </Marker>
                    }
                   
                </MapView>
                : null
            }
            
            {props.missionState.missionGetSuccess && mission?.missionPath !== undefined && mission.drone !== undefined? 
             <Card>
                <Card.Title title="Mission details"/>
                <Card.Content>
                    <Text>Date: {mission.missionStart.toLocaleString()}</Text> 
                    <Text>Drone used: {mission.drone.droneName}</Text> 
                    {
                        (mission.missionEnd !== undefined && mission.missionEnd !== null) ? 
                        <Text>Mission duration: { Math.floor((new Date(mission.missionEnd).getTime() - new Date(mission.missionStart).getTime() ) /60000) } min</Text> 
                        : <Text>Mission duration: in place</Text> 
                    }
                    
                </Card.Content>
             </Card>
            : null}
            <FAB
                onPress={changeRegion}
                icon="map-marker"
                style={missionStyle.fab}
                color={"white"}
            /> 
           
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

export default connect(mapStateToProps, mapDispatchToProps)(MissionScreen);