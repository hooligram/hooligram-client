import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import { colors } from 'hg/constants'

export default class GroupLeave extends Component {
  static navigationOptions = {
    headerTitle: 'Leave group'
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