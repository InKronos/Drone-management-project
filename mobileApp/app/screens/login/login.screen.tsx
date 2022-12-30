import React from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { loginStyle } from "./login.style";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = (props: LoginScreenProps) => {

    const login = () => props.navigation.navigate("Home");
    const register = () => props.navigation.navigate("Register");

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Drone Managment" titleStyle={loginStyle.cardTitle}> </Card.Title>
                    <Card.Content>
                        <TextInput label="Email" keyboardType="email-address"></TextInput>
                        <TextInput label="Password" secureTextEntry={true}></TextInput>
                        <Button style={loginStyle.cardButton}>Forget password</Button>
                        <Button 
                            style={loginStyle.cardButton} 
                            mode="contained"
                            onPress={login}>
                            LOGIN
                        </Button>
                        <Button 
                            style={loginStyle.cardButton}
                            onPress={register}>
                            REGISTER
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}