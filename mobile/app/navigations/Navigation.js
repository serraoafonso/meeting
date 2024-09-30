import { View, Text } from 'react-native'
import React,{useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Friends from '../pages/Friends';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import Layout from '../pages/Layout';
import LayoutNot from '../pages/LayoutNot';
import { UserContext } from '../context/userContext';

const Stack = createStackNavigator()
export default function Navigation() {

    const {user} = useContext(UserContext)

        return (
              <>
                {
                 user != ''?
                (<Stack.Navigator  screenOptions={{headerShown: false}}>
                <Stack.Screen name='Layout' component={Layout}/>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Friends' component={Friends} />     
                <Stack.Screen name='Messages' component={Messages} />     
                <Stack.Screen name='Profile' component={Profile} />
                </Stack.Navigator>)
                :
                <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Layout' component={Layout}/>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                
                </Stack.Navigator>
                }
            </>
        );
}