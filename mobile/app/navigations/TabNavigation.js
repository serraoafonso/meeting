
import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { UserContext } from '../context/userContext';

export default function TabNavigation() {

  const {user} = useContext(UserContext)

  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        {user ? (
          <>
          <Tab.Screen name="Login" component={''} options={{
        tabBarLabel: 'Login',
        tabBarIcon: ({color, size})=>(
          <MaterialCommunityIcons name="login" size={size} color={color} />
        )
      }}/>
      <Tab.Screen name="Register" component={''} options={{
        tabBarLabel: 'Register',
        tabBarIcon: ({color, size})=>(
          <MaterialCommunityIcons name="register" size={size} color={color} />
        )
      }}/>
          </>
        ) : <>
        <Tab.Screen name="Home" component={''} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size})=>(
          <Entypo name="home" size={size} color={color} />
        )
      }}/><Tab.Screen name="Friends" component={''} options={{
        tabBarLabel: 'Friends',
        tabBarIcon: ({color, size})=>(
          <FontAwesome name="group" size={size} color={color} />
        )
      }}/><Tab.Screen name="Messages" component={''} options={{
        tabBarLabel: 'Messages',
        tabBarIcon: ({color, size})=>(
          <Entypo name="message" size={size} color={color} />
        )
      }}/><Tab.Screen name="Profile" component={''} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color, size})=>(
          <FontAwesome name="user" size={size} color={color} />
        )
      }}/>
        </>
      }
      
    </Tab.Navigator>
  )
}