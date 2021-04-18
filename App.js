import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Favorites from './src/screens/Favorites';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={Home}
          />
          <Drawer.Screen
            name="Favorites"
            component={Favorites}
          />
          <Drawer.Screen
            name="Details"
            component={Details}
            options={{
              drawerLabel: () => null,
              title: undefined,
              drawerIcon: () => null,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}