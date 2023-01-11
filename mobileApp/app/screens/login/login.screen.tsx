import { bindActionCreators } from "@reduxjs/toolkit";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Button, Card, Snackbar, Text, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import AuthService from "../../services/AuthService";
import { AppState } from "../../store/AppState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { login, loginFail, loginSuccess } from "../../store/login/login.actions";
import { LoginState } from "../../store/login/LoginState";
import { loginForm } from "./login.form";
import { loginStyle } from "./login.style";

interface LoginScreenProps {
    navigation: any;

    loadingState: LoadingState;
    loginState: LoginState;

    hideLoading: Function;
    showLoading: Function;
    login: Function;
    loginSuccess: Function;
    loginFail: Function;
}

const LoginScreen = (props: LoginScreenProps) => {

    const [userLogin, setUserLogin] = useState({email: "", password: ""});
    const [token, setToken] = useState();
    useEffect(() => {
        if (props.loginState.isLoggingIn){
            props.showLoading();

            AuthService.login(userLogin.email, userLogin.password).then(res => {
                console.log(res.data.access_token);
                setToken(res.data.access_token);
                props.loginSuccess(token);
                console.log(props.loginState.userToken);
                props.navigation.navigate("Home");
                props.hideLoading();
            })
            .catch(error => {
                props.loginFail(error.response.data.message);
            })
        }
        else{
            props.hideLoading();
        }
    }, [props.loginState.isLoggingIn]);

    const login = (userLogin: {email: string, password: string}) => {
        setUserLogin(userLogin);
        props.login();
    }
    const register = () => props.navigation.navigate("Register");
    const forgotPassword = () => {
        props.showLoading();
        setTimeout(() => {
            props.hideLoading()
        }, 3000)
    }

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
                                    <Button 
                                        style={loginStyle.cardButton}
                                        onPress={forgotPassword}>
                                        Forget password
                                    </Button>
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
            {
                props.loginState.error ?
                <Snackbar
                    duration={5000}
                    visible={true}
                    onDismiss={() => {}}>
                    {props.loginState.error}
                </Snackbar>
                : null
            }
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    loginState: store.login
})

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        loginSuccess: loginSuccess,
        loginFail: loginFail,
        login: login,
        hideLoading: hide,
        showLoading: show
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);