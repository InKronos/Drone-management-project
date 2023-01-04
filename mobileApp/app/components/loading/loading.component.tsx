import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { LoadingState } from "../../store/loading/LoadingState";
import { loadingComponentStyle } from "./loading.component.style";

interface LoadingComponentProps {
    loadingState: LoadingState;
}

const LoadingComponent = (props: LoadingComponentProps) => {
    return (
        props.loadingState.show ?
        <View style={loadingComponentStyle.backdrop}>
            <ActivityIndicator animating={true} color={loadingComponentStyle.spinner.color}/>
        </View>
        : null
    );
}

const mapStateToProps = (store: {loading: LoadingState}) : LoadingComponentProps => ({
    loadingState: store.loading
})

export default connect(mapStateToProps)(LoadingComponent);