import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { colors } from 'hg/constants'

export default class GroupMemberAdd extends Component {
  static navigationOptions = {
    headerTitle: 'New member'
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
          title='Add'
        />
      </View>
    )
  }
}
