import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = Storage();

  async store(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAll(keys) {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }

  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }

  async get(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
      throw Error(error);
    }
  }
}

export {Storage};
