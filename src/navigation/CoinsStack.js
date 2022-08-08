import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CoinsScreen} from '../screens/CoinsScreen';
import {CoinDetailScreen} from '../screens/CoinsScreen/CoinDetailScreen';
import {colors} from '../res/colors';

const Stack = createStackNavigator();

function CoinStack() {
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
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="Coin Detail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
}

export {CoinStack};
