import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

export default class Conversation extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    isAuthorized: PropTypes.bool.isRequired
  }

  render() {
    const {
      isAuthorized,
      userName
    } = this.props

    if (!isAuthorized) {
      return (
        <View>
          <Text>{
            'signing you in ...'
          }</Text>
        </View>
      )
    }

    return (
      <View>
        <Text>username: ${userName}</Text>
      </View>
    )
  }
}
