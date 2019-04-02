import { AsyncStorage } from 'react-native'

export default class {
  static loadObject = async (key) => {
    const result = await AsyncStorage.getItem(key)

    try {
      return JSON.parse(result)
    }
    catch (err) {
      console.error('error getting stored object from async storage. ', err)
      return null
    }
  }

  static saveObject = async (key, object) => {
    await AsyncStorage.setItem(key, JSON.stringify(object))
  }
}
