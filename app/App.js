import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { websocketConnect } from 'hg/actions'
import { colors } from 'hg/constants'
import { setTopLevelNavigator } from 'hg/middlewares/navigation'
import Navigation from 'hg/navigation'

class App extends Component {
  static propTypes = {
    isWebsocketOnline: PropTypes.bool.isRequired,
    websocketConnect: PropTypes.func.isRequired
  }

  render () {
    return (
      <>
        <StatusBar
          backgroundColor={this.props.isWebsocketOnline ? colors.TEAL : colors.GOLDEN_POPPY}
        />
        <Navigation
          ref={setTopLevelNavigator}
        />
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
