import { Formik } from "formik";
import React from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { loginForm } from "./login.form";
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
                        <Formik
                            initialValues={{email: "", password: ""}}
                            onSubmit={login}
                            validationSchema={loginForm}>
                                {({handleSubmit, handleChange, errors, setFieldTouched, touched}) => (
                                    <>
                                        <TextInput 
                                            label="Email" 
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            onFocus={() => setFieldTouched('email')}/>
                                        {
                                            touched.email && errors.email ?
                                            <Text style={{color: 'white', backgroundColor: "red"}}>
                                                {errors.email}
                                            </Text>
                                            : null
                                        }
                                       
                                        <TextInput 
                                            label="Password" 
                                            secureTextEntry={true}
                                            onChangeText={handleChange('password')}
                                            onFocus={() => setFieldTouched('password')}/>
                                        {
                                            touched.password && errors.password ?
                                            <Text style={{color: 'white', backgroundColor: "red"}}>
                                                {errors.password}
                                            </Text>
                                            : null
                                        }
                                        <Button style={loginStyle.cardButton}>Forget password</Button>
                                        <Button 
                                            style={loginStyle.cardButton} 
                                            mode="contained"
                                            onPress={handleSubmit}>
                                            LOGIN
                                        </Button>
                                        <Button 
                                            style={loginStyle.cardButton}
                                            onPress={register}>
                                            REGISTER
                                        </Button>
                                    </>
                                )}
                        </Formik>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}