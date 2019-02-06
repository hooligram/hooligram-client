import { AsyncStorage } from 'react-native'

const STORAGE_KEY_STATE = 'STORAGE:STATE'

export default class PersistenceApi {
  static getState = async () => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEY_STATE)
    }
    catch (error) {
      return undefined
    }
  }
}