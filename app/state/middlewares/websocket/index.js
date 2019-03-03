import Config from 'react-native-config'
import middleware from './middleware'
import websocket from './websocket'

export default middleware(websocket({
  host: Config.API_HOST
}))
