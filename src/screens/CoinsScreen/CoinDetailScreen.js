/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import {CoinMarketItem} from '../../components/CoinMarketItem';
import {fetchData} from '../../libs/fetchData';
import {Storage} from '../../libs/storage';
import {colors} from '../../res/colors';

const API_URL = 'https://api.coinlore.net/api/coin/markets/?id=';

function CoinDetailScreen({route, navigation}) {
  const [state, setState] = useState({
    coin: route.params.coin,
    markets: [],
    isFavorite: false,
  });

  const getMarkets = async id => {
    const response = await fetchData(`${API_URL}${id}`);
    setState({
      ...state,
      markets: response,
    });
  };

  const getCoinIcon = name => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  const handleFavoriteBtn = () => {
    if (!state.isFavorite) {
      addFavotite();
    } else {
      removeFavotite();
    }
  };

  const addFavotite = async () => {
    const coin = JSON.stringify(state.coin);
    const key = `favorite-${state.coin.id}`;
    const stored = await Storage.store(key, coin);
    if (stored) {
      setState({
        ...state,
        isFavorite: true,
      });
    }
  };

  const getFavorite = async () => {
    try {
      const key = `favorite-${state.coin.id}`;
      const favoriteStr = await Storage.get(key);
      if (favoriteStr != null) {
        setState({
          ...state,
          isFavorite: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavotite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cansel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${state.coin.id}`;
          await Storage.remove(key);
          setState({
            ...state,
            isFavorite: false,
          });
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({title: state.coin.symbol});
    setTimeout(() => {
      getFavorite();
    }, 700);
  }, [state.coin]);

  useEffect(() => {
    if (!state.markets.length >= 1) {
      getMarkets(state.coin.id);
    }
  }, [state.markets]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImage}
            source={{uri: getCoinIcon(state.coin.name)}}
          />
          <Text style={styles.title}>{state.coin.name}</Text>
        </View>
        <Pressable
          onPress={handleFavoriteBtn}
          style={[
            styles.btnFavorite,
            !state.isFavorite
              ? styles.btnFavoriteAdd
              : styles.btnFavoriteRemove,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {state.isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(state.coin)}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.sectionText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.titleMarkets}>Markets</Text>
      <FlatList
        style={styles.listMarkets}
        horizontal={true}
        data={state.markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    padding: 16,
    flexDirection: 'row',
    // alignContent: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleMarkets: {
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16,
  },
  listMarkets: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.picton,
  },
  btnFavoriteText: {
    color: colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});

export {CoinDetailScreen};
