import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

export default class Conversation extends Component {
  static propTypes = {
    code: PropTypes.string,
    country_code: PropTypes.string,
    phone_number: PropTypes.string,
    isAuthorized: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired
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

  componentDidMount() {
    const {
      code,
      country_code,
      phone_number
    } = this.props

    this.props.signIn(code, country_code, phone_number)
  }
}
