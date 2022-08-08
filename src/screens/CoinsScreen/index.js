import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {colors} from '../../res/colors';
import {fetchData} from '../../libs/fetchData';
import {CoinItem} from '../../components/CoinItem';

function CoinsScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState(null);

  const handlePress = coin => {
    navigation.navigate('Coin Detail', {coin});
  };

  useEffect(() => {
    if (!coins) {
      setLoading(true);
      (async () => {
        const response = await fetchData(
          'https://api.coinlore.net/api/tickers/',
        );
        setCoins(response.data);
      })();
    } else {
      setLoading(false);
    }
  }, [coins]);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      )}
      <FlatList
        data={coins}
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
