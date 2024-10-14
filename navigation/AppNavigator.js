import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import TabBarIcon from './TabBarIcon';
import colors from '../theme/colors';

import WelcomeScreen from '../app/screens/signedOutStack/Welcome';
import CreateAccountScreen from '../app/screens/signedOutStack/CreateAccount';
import ForgotPasswordScreen from '../app/screens/signedOutStack/ForgotPassword';
import LoginScreen from '../app/screens/signedOutStack/Login';
import CommunityScreen from '../app/screens/signedInStack/Community'
import FeedScreen from '../app/screens/signedInStack/Feed';
import QuestsScreen from '../app/screens/signedInStack/Quests';
import ProfileScreen from '../app/screens/signedInStack/Profile';
import GuideScreen from '../app/screens/signedInStack/Guide';
import HabitatScreen from '../app/screens/signedInStack/Habitat';
import PlanetHabitatsScreen from '../app/screens/signedInStack/PlanetHabitats';
import PointsCalculatorScreen from '../app/screens/signedInStack/PointsCalculator';
import SettingsScreen from '../app/screens/signedInStack/settings/Settings';
import EditGuideScreen from '../app/screens/signedInStack/EditGuide';
import ViewGuideScreen from '../app/screens/signedInStack/ViewGuide';
import { useUser } from '../context/UserContext';

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
    }}
    initialRouteName='Feed'
  >
    <BottomTab.Screen
      name="Feed"
      component={FeedScreen}
      options={{ tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon iconName={"home"} iconOutlineName={"home-outline"}
            focused={focused} navRoute="Feed"
          />
        )
      }}
    />
    <BottomTab.Screen
      name="Guides"
      component={GuideScreen}
      options={{ tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon iconName={"book"} iconOutlineName={"book-outline"}
            focused={focused} navRoute="Guides"
          />
        )
      }}
    />
    <BottomTab.Screen
      name="Community"
      component={CommunityScreen}
      options={{ tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon iconName={"people"} iconOutlineName={"people-outline"}
            focused={focused} navRoute="Community"
          />
        )
      }}
    />
    <BottomTab.Screen
      name="Quests"
      component={QuestsScreen}
      options={{ tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon iconName={"golf"} iconOutlineName={"golf-outline"}
            focused={focused} navRoute="Quests"
          />
        )
      }}
    />
    <BottomTab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon iconName={"person"} iconOutlineName={"person-outline"}
            focused={focused} navRoute="Profile"
          />
        )
      }}
    />
  </BottomTab.Navigator>
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{ headerShown: false, navigationBarColor: colors.black }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="ViewGuide" component={ViewGuideScreen} />
        <Stack.Screen name="EditGuides" component={EditGuideScreen} />
        <Stack.Screen name="Habitat" component={HabitatScreen} />
        <Stack.Screen name="PlanetHabitats" component={PlanetHabitatsScreen} />
        <Stack.Screen name="PointsCalculator" component={PointsCalculatorScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator