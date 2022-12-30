/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './App.style'
import AppNavigator from './app/app.navigator';
import { HomeScreen } from './app/screens/home/home.screen';
import { LoginScreen } from './app/screens/login/login.screen';
import { RegisterScreen } from './app/screens/register/register.screen';



const App = () => {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
};


export default App;
