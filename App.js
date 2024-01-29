import React from 'react';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import 'react-native-gesture-handler';
import HelloPanel from "./components/home";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gymaps from "./components/Gymaps";

const Stack  = createStackNavigator();


const App = () => {
  return (
          <Layout style={{ flex: 1, justifyContent: 'center'}}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HelloPanel} options={{ headerShown: false }}/>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                        <Stack.Screen name="Gymaps" component={Gymaps} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
          </Layout>
  );
};

export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
);
