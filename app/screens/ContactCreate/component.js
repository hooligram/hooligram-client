import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { colors } from 'hg/constants'

export default class ContactCreate extends Component {
  static navigationOptions = {
    headerTitle: 'New contact'
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
        <Button
          onPress={this.props.goToGroupMessage}
          title='Create'
        />
      </View>
    )
  }
}
