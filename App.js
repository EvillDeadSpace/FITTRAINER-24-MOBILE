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
import ExercisePanel from "./components/ExercisePanel";
import Orders from "./menuComponents/Orders";
import Meni from "./costans/Meni";
import Addresses from "./menuComponents/Addresses";
import Settings from "./menuComponents/Settings";
import { UserProvider } from './components/UserProvider';
import BottomTabNavigator from "./components/Navigation";
import ViewProfile from "./menuComponents/ViewProfile";
import Favorite from "./components/Favorite";
import ExercisesList from './costans/ExercisesList';
import CoachList from './costans/CoachList';
import ExerciseForward from './costans/ExercisesForward';

const Stack  = createStackNavigator();

const App = () => {
  return (
          <Layout style={{ flex: 1, justifyContent: 'center', backgroundColor:"lightblue"}}>
              <UserProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HelloPanel} options={{ headerShown: false }}/>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                        <Stack.Screen name="Gymaps" component={Gymaps} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                        <Stack.Screen name="ExercisePanel" component={ExercisePanel} options={{ headerShown: false }}/>
                        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }}/>
                        <Stack.Screen name="Meni" component={Meni} options={{ headerShown: false }}/>
                        <Stack.Screen name="Addresses" component={Addresses} options={{ headerShown: false }}/>
                        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
                        <Stack.Screen name="ListExercise" component={ExercisePanel} options={{ headerShown: false }}/>
                        <Stack.Screen name="ViewProfile" component={ViewProfile} options={{ headerShown: false }}/>
                        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }}/>
                        <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }}/>
                        <Stack.Screen name='ExercisesList' component={ExercisesList} options={{ headerShown: false }}/>
                        <Stack.Screen name='CoachList' component={CoachList} options={{ headerShown: false }}/>
                        <Stack.Screen name='ExerciseForward' component={ExerciseForward} options={{ headerShown: false }}/>
                    </Stack.Navigator>
                </NavigationContainer>
              </UserProvider>

          </Layout>
  );
};

export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
      <App />
    </ApplicationProvider>
);
