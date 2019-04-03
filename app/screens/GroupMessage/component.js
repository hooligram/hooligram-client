import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import { colors } from 'hg/constants'

export default class GroupMessage extends Component {
  static navigationOptions = {
    headerTitle: 'Conversation'
  }

  static propTypes = {}

  state = {}

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1
        }}
      >
      </View>
    )
  }
}
