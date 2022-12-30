import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { loginStyle } from "./login.style";

export const LoginScreen = () => {
    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Drone Managment" titleStyle={loginStyle.cardTitle}> </Card.Title>
                    <Card.Content>
                        <TextInput label="Email" keyboardType="email-address"></TextInput>
                        <TextInput label="Password" secureTextEntry={true}></TextInput>
                        <Button style={loginStyle.cardButton}>Forget email/password</Button>
                        <Button style={loginStyle.cardButton} mode="contained">LOGIN</Button>
                        <Button style={loginStyle.cardButton}>REGISTER</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}