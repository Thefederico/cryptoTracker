import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {FavoritesEmptyState} from '../../components/FavoritesEmptyState';
import {CoinItem} from '../../components/CoinItem';
import {Storage} from '../../libs/storage';
import {colors} from '../../res/colors';

function FavoriteScreen({navigation}) {
  const [favoritesCoins, setFavoritesCoins] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Storage.getAll(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      setFavoritesCoins(favorites);
      console.log('favs', favorites);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = coin => {
    navigation.navigate('Coin Detail', {coin});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getFavorites();
  }, []);

  if (favoritesCoins.length === 0) {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={favoritesCoins}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});

export {FavoriteScreen};
