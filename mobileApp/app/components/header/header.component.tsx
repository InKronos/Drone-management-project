import React, { useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import { theme } from "../../../App.style";
import { headerStyle } from "./header.style";

export const HeaderComponent = (props: HeaderComponentParams) => {

    const [visible, setVisible] = useState(false);

    const goBack = () => props.navigation?.goBack();
    const logout = () => {
        props.navigation?.navigate("Login");
        closeMenu();
    }
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    

    return (
        <Appbar.Header style={headerStyle.appBack}>
            {
                props.hasBackButton ?
                <Appbar.BackAction onPress={goBack} color={headerStyle.menu.color} />
                :
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action
                            icon="menu"
                            color={headerStyle.menu.color}
                            onPress={openMenu}/>
                    }>
                    <Menu.Item
                        title="Delete profile"
                        onPress={()=>{}}/>
                    <Menu.Item
                        title="Edit profile"
                        onPress={()=>{}}/>
                    <Menu.Item
                        title="Logout"
                        onPress={logout}/>
                       
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