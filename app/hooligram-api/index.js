import Config from 'react-native-config'
import hooligramApi from './hooligramApi'

export default hooligramApi({
  host: Config.API_HOST
})
