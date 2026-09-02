import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen } from '../screens/FeedScreen';
import { FAACScreen } from '../screens/FAACScreen';
import { PromisesScreen } from '../screens/PromisesScreen';
import { FOIScreen } from '../screens/FOIScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Newspaper, Landmark, ShieldCheck, FileText, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#09090b',
          borderBottomWidth: 1,
          borderBottomColor: '#27272a',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 17,
        },
        tabBarStyle: {
          backgroundColor: '#09090b',
          borderTopWidth: 1,
          borderTopColor: '#27272a',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#71717a',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'News Wire',
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => <Newspaper color={color} size={size - 2} />,
        }}
      />
      <Tab.Screen
        name="FAAC"
        component={FAACScreen}
        options={{
          title: 'Treasury (FAAC)',
          tabBarLabel: 'FAAC',
          tabBarIcon: ({ color, size }) => <Landmark color={color} size={size - 2} />,
        }}
      />
      <Tab.Screen
        name="Promises"
        component={PromisesScreen}
        options={{
          title: 'Promise Tracker',
          tabBarLabel: 'Promises',
          tabBarIcon: ({ color, size }) => <ShieldCheck color={color} size={size - 2} />,
        }}
      />
      <Tab.Screen
        name="FOI"
        component={FOIScreen}
        options={{
          title: 'FOI Builder',
          tabBarLabel: 'FOI',
          tabBarIcon: ({ color, size }) => <FileText color={color} size={size - 2} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings & NDPR',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size - 2} />,
        }}
      />
    </Tab.Navigator>
  );
};
