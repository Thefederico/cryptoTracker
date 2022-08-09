import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FavoritesEmptyState} from '../../components/FavoritesEmptyState';
import {colors} from '../../res/colors';

function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});

export {FavoriteScreen};
