import React, {useState} from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native';
import {colors} from '../res/colors';

function CoinSearch({onChange}) {
  const [value, setValue] = useState();

  const handleInput = query => {
    setValue(query);

    if (onChange) {
      onChange(query);
    }
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIos : styles.textInputAndroid,
        ]}
        onChangeText={handleInput}
        value={value}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIos: {
    margin: 8,
    borderRadius: 8,
  },
});

export {CoinSearch};
