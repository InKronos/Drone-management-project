import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Appbar, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../../App.style";
import { HeaderComponent } from "../../components/header.components";
import { registerStyle } from "./register.style";

interface RegisterScreenProps {
    navigation: any;
}


export const RegisterScreen = (props: RegisterScreenProps) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="Register" hasBackButton={true} navigation={props.navigation}/>
                <View style={registerStyle.content}>
                    <TextInput label="Name" />
                    <TextInput label="Email" keyboardType="email-address"/>
                    <TextInput label="Password" secureTextEntry={true} right={<TextInput.Icon icon="eye-off-outline"/>} />
                    <TextInput label="Confirm password" secureTextEntry={true} right={<TextInput.Icon icon="eye-off-outline"/>}/>
                    <TextInput label="Phone number" keyboardType="phone-pad" />
                    <Button mode="contained" style={registerStyle.button}>Register</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}