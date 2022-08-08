import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {colors} from '../../res/colors';
import {fetchData} from '../../libs/fetchData';
import {CoinItem} from '../../components/CoinItem';
import {CoinSearch} from '../../components/CoinSearch';

const API_URL = 'https://api.coinlore.net/api/tickers/';

function CoinsScreen({navigation}) {
  const [state, setState] = useState({
    loading: false,
    coins: [],
    allCoins: [],
  });

  const handlePress = coin => {
    navigation.navigate('Coin Detail', {coin});
  };

  const getCoins = async url => {
    setState({
      ...state,
      loading: true,
    });
    const response = await fetchData(url);
    setState({
      ...state,
      coins: response.data,
      allCoins: response.data,
    });
  };

  const handleSearch = query => {
    const coinsFiltered = state.allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setState({
      ...state,
      coins: coinsFiltered,
    });
  };

  useEffect(() => {
    if (!state.coins.length >= 1) {
      getCoins(API_URL);
    } else {
      setState({
        ...state,
        loading: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.coins, state.allCoins]);

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearch} />
      {state.loading && (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      )}
      <FlatList
        data={state.coins}
        renderItem={({item}) => (
          <CoinItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export {CoinsScreen};
