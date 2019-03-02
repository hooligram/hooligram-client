import Config from 'react-native-config'
import websocket from './websocket'

export default websocket({
  host: Config.API_HOST
})
