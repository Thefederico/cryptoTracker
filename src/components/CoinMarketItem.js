import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../res/colors';

function CoinMarketItem({item}) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderWidth: 1,
    borderColor: colors.zircon,
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#fff',
  },
});

export {CoinMarketItem};
