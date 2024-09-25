
import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
        ) : ''
      }
      
    </Tab.Navigator>
  )
}