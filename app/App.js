import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { websocketConnect } from 'hg/actions'
import { colors, dimensions } from 'hg/constants'
import { setTopLevelNavigator } from 'hg/middlewares/navigation'
import Navigation from 'hg/navigation'

class App extends Component {
  static propTypes = {
    isWebsocketOnline: PropTypes.bool.isRequired
  }

  render () {
    return (
      <>
        {
          !this.props.isWebsocketOnline
          &&
          <View
            style={
              {
                backgroundColor: colors.GOLDEN_POPPY,
                paddingVertical: dimensions.PADDING_XSMALL
              }
            }
          >
          </View>
        }
        <Navigation ref={setTopLevelNavigator}/>
      </>
    )
  }

  componentDidMount () {
    this.props.websocketConnect()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    websocketConnect: () => {
      dispatch(websocketConnect())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isWebsocketOnline: state.app.isWebsocketOnline
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
