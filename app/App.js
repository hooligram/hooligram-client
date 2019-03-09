import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { colors, dimensions } from 'hg/constants'
import { appStartup } from 'hg/state/actions/app'
import { setTopLevelNavigator } from 'hg/state/middlewares/navigation/middleware'
import Navigation from 'hg/state/middlewares/navigation/stacks'

class App extends Component {
  static propTypes = {
    appStartup: PropTypes.func.isRequired,
    isWebsocketOnline: PropTypes.bool.isRequired
  }

  render() {
    return (
      <>
        {!this.props.isWebsocketOnline && (
          <View
            style={{
              alignItems: 'center',
              backgroundColor: colors.GOOGLE_RED,
              justifyContent: 'center',
              paddingVertical: dimensions.PADDING,
            }}
          >
            <Text
              style={{
                color: colors.WHITE
              }}
            >You are offline. Reconnecting...</Text>
          </View>
        )}
        <Navigation ref={setTopLevelNavigator}/>
      </>
    )
  }

  componentDidMount () {
    this.props.appStartup()
  }

  goToNextScreen = () => console.log('goToNextScreen')
}

const mapStateToProps = (state) => {
  const {
    app: {
      websocketOnline
    }
  } = state

  return {
    isWebsocketOnline: websocketOnline
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appStartup: () => {
      dispatch(appStartup())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
