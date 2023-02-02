import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import { Button, Card, FAB, List, Snackbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import HeaderComponent  from "../../components/header/header.component";
import { AppState } from "../../store/AppState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { missionLoading, showMisssionFail, showMisssionSuccess } from "../../store/mission/mission.action";
import { MissionState } from "../../store/mission/MissionState";
import { Mission } from "../../model/mission/Mission";
import MissionService from "../../services/MissionService";
import MapView, { LatLng, Marker, Polyline, Region } from "react-native-maps";
import { createMissionStyle } from "./createMission.style";
import { useIsFocused } from "@react-navigation/native";

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




const CreateMissionScreen = (props: MissionScreenProps) => {
    
    const onRegionChange = (region: Region) => {
        setRegion(region);
    }

    const onMapPress = (coordinates: LatLng) => {
        setMarker(true);
        setUserCords(coordinates);
    }

    const [marker, setMarker] = useState(false);
    const [userCords, setUserCords] = useState<LatLng>()

    const changeRegion = () => setRegion(initialRegion);

    const refresh = () => props.missionLoading();

    const [mission, setMission] = useState<Mission>();

    const [refreshing, setRefreshing] = React.useState(false);

    const [region, setRegion] = useState<Region | undefined>();

    const [initialRegion, setInitialRegion] = useState<Region>();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);


    
    const createMission = () => {
        if(userCords !== undefined && userCords !== null){
            MissionService.createMission(parseFloat(props.route.params.id), parseFloat(props.route.params.long), parseFloat(props.route.params.lat),
            userCords?.longitude, userCords?.latitude).then(res => {
                props.navigation.navigate("Mission", { id: res});
            }).catch(error => {
                console.log(error);
            })
        }
          
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && setRegion({
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
            latitude: parseFloat(props.route.params.lat),
            longitude: parseFloat(props.route.params.long)
        });
        isFocused && setMarker(false);

    }, [isFocused]);

   

    return (
        <SafeAreaView style={createMissionStyle.content}>
            <HeaderComponent title="Create Mission" hasBackButton={true} navigation={props.navigation}/>
                <View style={{flex: 1}}>
                    <MapView
                        style={{ height: "60%"}}
                        region={region}
                        onRegionChangeComplete={onRegionChange}
                        zoomEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        zoomTapEnabled={false}
                        zoomControlEnabled={false}
                        pitchEnabled={false}
                        scrollDuringRotateOrZoomEnabled={false}
                        toolbarEnabled={false}
                        onPress={(event) => {onMapPress(event.nativeEvent.coordinate)}}
                        >
                        <Marker
                        description="marker"
                        coordinate={{
                            longitude: parseFloat(props.route.params.long),
                            latitude: parseFloat(props.route.params.lat)
                        }
                        }
                        tappable={false}
                        pinColor={'red'}
                        />
                        {
                            marker && userCords !== undefined ?
                            <Marker
                            description="userMarker"
                            coordinate={userCords}
                            pinColor={'red'}
                            tappable={false}
                            />
                            : null
                        }
                                        
                    </MapView>
                    { marker && userCords !== undefined ?
                     <View style={createMissionStyle.textContainer}>
                            <Button mode="contained" onPress={createMission}>Start mission</Button>
                        </View>
                    : <View style={createMissionStyle.textContainer}>
                    <Text > No descination selected </Text>
                </View>}
                </View>
           
           
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateMissionScreen);