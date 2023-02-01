import { useIsFocused } from "@react-navigation/native";
import { bindActionCreators } from "@reduxjs/toolkit";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { Button, Card, FAB, Snackbar, Text, TextInput } from "react-native-paper";
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
    const [snackbar, setSnackbar] = useState(false);

    const isFocused = useIsFocused();
    useEffect(() => {
        console.log("??");
        isFocused && setUserLogin({email: "", password: ""})
    }, [isFocused]);

    useEffect(() => {
        if (props.loginState.isLoggingIn){
            props.showLoading();

            AuthService.login(userLogin.email, userLogin.password).then(res => {
                console.log(res.data.access_token);
                setToken(res.data.access_token);
                props.loginSuccess(res.data.access_token);
                console.log(">??")
                console.log(props.loginState.userToken);
                props.navigation.navigate("Home");
                props.hideLoading();
                
            })
            .catch(error => {
                setSnackbar(true);
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
 

    return (
        <SafeAreaView style={loginStyle.content}>
            <View style={loginStyle.view}>
                <Card>
                    <Card.Title title="Drone Managment" titleStyle={loginStyle.cardTitle}> </Card.Title>
                    <Card.Content>
                        <Formik
                        initialValues={userLogin}
                        onSubmit={(values, {resetForm}) => {
                            login(values);
                            
                        }}
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
                                        <Text style={{color: 'red'}}>
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
                                        <Text style={{color: 'red'}}>
                                            {errors.password}
                                        </Text>
                                        : null
                                    }

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


                <Snackbar
                    duration={5000}
                    visible={snackbar}
                    onDismiss={() => {setSnackbar(false)}}>
                    {props.loginState.error}
                </Snackbar>

            <FAB
                onPress={() => {}}
                icon="help"
                style={loginStyle.fab}
                color={"white"}
            /> 
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