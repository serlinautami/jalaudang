import AsyncStorage  from '@react-native-async-storage/async-storage';

/**
 * @name setStorage();
 * @description untuk menyimpan data ke local storage
 */
export const setStorage = async (key, value) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
    return value;
  } catch (err) {
    // console.log('error storage', err)
  }
}

/**
 * @name getStorage();
 * @description untuk mendapatkan data dari local storage
 */
export const getStorage = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    
    if(!data) {
      return false;
    }

    return JSON.parse(data);
  } catch (err) {
    // console.log('error storage', err)
  }
}

/**
 * @name deleteStorage();
 * @description untuk menghapus data local storage berdasarkan key
 */
export const deleteStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    // console.log('error storage', err)
  }
}