import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
} from 'react-native';
import {CoinMarketItem} from '../../components/CoinMarketItem';
import {fetchData} from '../../libs/fetchData';
import {colors} from '../../res/colors';

const API_URL = 'https://api.coinlore.net/api/coin/markets/?id=';

function CoinDetailScreen({route, navigation}) {
  const [coin] = useState(route.params.coin);
  const [markets, setMarkets] = useState(null);

  const getData = async id => {
    const response = await fetchData(`${API_URL}${id}`);
    setMarkets(response);
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

  useEffect(() => {
    navigation.setOptions({title: coin.symbol});

    if (!markets) {
      getData(coin.id);
    }
  }, [coin.id, coin.symbol, markets, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImage}
          source={{uri: getCoinIcon(coin.name)}}
        />
        <Text style={styles.title}>{coin.name}</Text>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
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
        data={markets}
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
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
    padding: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: '#fff',
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
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleMarkets: {
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  listMarkets: {
    maxHeight: 100,
    paddingLeft: 16,
  },
});

export {CoinDetailScreen};
