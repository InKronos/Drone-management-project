import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { theme } from "../../App.style";
import { headerStyle } from "./header.style";

export const HeaderComponent = (props: HeaderComponentParams) => {

    const goBack = () => props.navigation?.goBack();

    return (
        <Appbar.Header style={headerStyle.appBack}>
            {
                props.hasBackButton ?
                <Appbar.BackAction onPress={goBack}/>
                :
                <Menu
                    visible={true}
                    onDismiss={() => {}}
                    anchor={
                        <Appbar.Action
                            icon="menu"
                            color={headerStyle.menu.color}/>
                    }
                    >
                </Menu>
            }
            
            <Appbar.Content title={props.title} color={headerStyle.menu.color} />
        </Appbar.Header>
    )
}

interface HeaderComponentParams {
    title: string;
    hasBackButton: boolean;
    navigation?: any;
}