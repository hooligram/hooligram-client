import { AsyncStorage } from 'react-native'

const STORAGE_KEY_STATE = 'STORAGE:STATE'

export default class PersistenceApi {
  static getState = async () => {
    const result = await AsyncStorage.getItem(STORAGE_KEY_STATE)
    try {
      return JSON.parse(result)
    }
    catch (_) {
      return undefined
    }
  }

  static saveState = async (state) => {
    const stateString = JSON.stringify(state)
    await AsyncStorage.setItem(STORAGE_KEY_STATE, stateString)
  }
}
