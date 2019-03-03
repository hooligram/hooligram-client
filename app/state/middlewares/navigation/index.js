import { NavigationActions } from 'react-navigation'
import middleware from './middleware'

export default middleware(NavigationActions)
export { default as routeNames } from './route-names'
