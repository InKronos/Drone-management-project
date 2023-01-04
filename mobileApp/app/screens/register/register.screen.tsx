import { bindActionCreators } from "@reduxjs/toolkit";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { HeaderComponent } from "../../components/header/header.component";
import AuthService from "../../services/AuthService";
import { AppState } from "../../store/AppState";
import { hide, show } from "../../store/loading/loading.actions";
import { LoadingState } from "../../store/loading/LoadingState";
import { register, registerFail, registerSuccess } from "../../store/register/register.action";
import { RegisterState } from "../../store/register/RegisterState";
import { registerForm } from "./register.form";
import { registerStyle } from "./register.style";

interface RegisterScreenProps {
    navigation: any;

    loadingState: LoadingState,
    registerState: RegisterState,

    hideLoading: Function;
    showLoading: Function;
    register: Function;
    registerSuccess: Function;
    registerFail: Function;
}


const RegisterScreen = (props: RegisterScreenProps) => {

    const [userRegister, setUserRegister] = useState({name: "", email: "", password: "", phone_number: ""});
    const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
    const [secureTextEntryPasswordConfirm, setSecureTextEntryPasswordConfirm] = useState(true);

    const [eyePassword, setEyePassword] = useState("eye-off-outline");
    const [eyePasswordConfirm, setEyePasswordConfirm] = useState("eye-off-outline");

    useEffect(() => {
        if (props.registerState.isRegistering){
            props.showLoading();

            AuthService.register(userRegister.name, userRegister.email, userRegister.password, userRegister.phone_number).then(res => {
                console.log(res);
                props.registerSuccess("yes");
                props.navigation.navigate("Login");
                props.hideLoading();
            })
            .catch(error => {
                props.registerFail(error.response.data.message);
            })
        }
        else{
            props.hideLoading();
        }
    }, [props.registerState.isRegistering]);

    const register = (userRegister: {name: string, email: string, password: string , phone_number: string}) => {
        setUserRegister(userRegister);
        props.register();
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <HeaderComponent title="Register" hasBackButton={true} navigation={props.navigation}/>
                <View style={registerStyle.content}>
                    <Formik
                     initialValues={{name: "", email: "", password: "", confirm_password: "", phone_number: ""}}
                     onSubmit={register}
                     validationSchema={registerForm}>
                        {({handleSubmit, handleChange, errors, setFieldTouched, touched}) => (
                            <>
                            <TextInput 
                                label="Name" 
                                onChangeText={handleChange('name')}
                                onFocus={() => setFieldTouched('name')}/>
                            {
                                touched.name && errors.name ?
                                <Text style={{color: 'white', backgroundColor: "red"}}>
                                    {errors.name}
                                </Text>
                                : null
                            }
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
                                secureTextEntry={secureTextEntryPassword} 
                                right={
                                    <TextInput.Icon 
                                        icon={eyePassword}
                                        onPress={() => {
                                            setSecureTextEntryPassword(!secureTextEntryPassword);
                                            eyePassword === "eye-off-outline" ? setEyePassword("eye") : setEyePassword("eye-off-outline");
                                            return false;
                                        }}/>} 
                                onChangeText={handleChange('password')}
                                onFocus={() => setFieldTouched('password')}/>
                            {
                                touched.password && errors.password ?
                                <Text style={{color: 'white', backgroundColor: "red"}}>
                                    {errors.password}
                                </Text>
                                : null
                            }
                            <TextInput 
                                label="Confirm password" 
                                secureTextEntry={secureTextEntryPasswordConfirm} 
                                right={
                                    <TextInput.Icon 
                                        icon={eyePasswordConfirm}
                                        onPress={() => {
                                            setSecureTextEntryPasswordConfirm(!secureTextEntryPasswordConfirm);
                                            eyePasswordConfirm === "eye-off-outline" ? setEyePasswordConfirm("eye") : setEyePasswordConfirm("eye-off-outline");
                                            return false;
                                        }}/>} 
                                onChangeText={handleChange('confirm_password')}
                                onFocus={() => setFieldTouched('confirm_password')}/>
                            {
                                touched.confirm_password && errors.confirm_password ?
                                <Text style={{color: 'white', backgroundColor: "red"}}>
                                    {errors.confirm_password}
                                </Text>
                                : null
                            }
                            <TextInput 
                                label="Phone number" keyboardType="phone-pad" 
                                onChangeText={handleChange('phone_number')}
                                onFocus={() => setFieldTouched('phone_number')}/>
                            {
                                touched.phone_number && errors.phone_number ?
                                <Text style={{color: 'white', backgroundColor: "red"}}>
                                    {errors.phone_number}
                                </Text>
                                : null
                            }
                            <Button 
                                mode="contained" 
                                style={registerStyle.button}
                                onPress={handleSubmit}>
                                Register
                            </Button>
                            </>
                        )}
                       
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (store: AppState) => ({
    loadingState: store.loading,
    registerState: store.register
})

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        register: register,
        registerSuccess: registerSuccess,
        registerFail: registerFail,
        hideLoading: hide,
        showLoading: show
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);