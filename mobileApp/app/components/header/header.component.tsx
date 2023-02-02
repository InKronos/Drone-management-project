import React, { useState } from "react";
import { Appbar, Button, Dialog, Menu, Portal, Text } from "react-native-paper";
import { connect } from "react-redux";
import { theme } from "../../../App.style";
import AuthService from "../../services/AuthService";
import { AppState } from "../../store/AppState";
import { LoginState } from "../../store/login/LoginState";
import { headerStyle } from "./header.style";

const HeaderComponent = (props: HeaderComponentParams) => {

    const [visible, setVisible] = useState(false);

    const goBack = () => props.navigation?.goBack();
    const logout = () => {
        props.navigation?.navigate("Login");
        closeMenu();
    }
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [visibleDelete, setVisibleDelete] = React.useState(false);

    const showDialog = () => setVisibleDelete(true);

    const hideDialog = () => setVisibleDelete(false);

    const deleteUser = () => {
        AuthService.delete(props.loginState.userToken).then(res => {
            if(res){
                props.navigation.navigate("Login");
            }
        }).catch(error => {
            console.log("error");
        })
    }

    return (
        <>
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
                        onPress={showDialog}/>
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
          <Portal>
          <Dialog visible={visibleDelete} onDismiss={hideDialog}>
            <Dialog.Title>Deleting</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Do you want delete user?</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>No</Button>
                <Button style={{backgroundColor: "red"}} onPress={deleteUser}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </>
    )
}

interface HeaderComponentParams {
    title: string;
    hasBackButton: boolean;
    navigation?: any;
    loginState: LoginState;
}

const mapStateToProps = (store: AppState)  => ({
    loginState: store.login
})

export default connect(mapStateToProps)(HeaderComponent);