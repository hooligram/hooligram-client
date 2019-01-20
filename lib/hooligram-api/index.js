import { API_HOST } from 'react-native-dotenv'
import hooligramApi from './hooligramApi'

export default hooligramApi({
  host: API_HOST
})
