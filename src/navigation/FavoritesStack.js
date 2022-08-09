import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoriteScreen} from '../screens/FavoriteScreen';
import {colors} from '../res/colors';

const Stack = createStackNavigator();

function FavoritesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

export {FavoritesStack};
