import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, View } from 'react-native'
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
        <Button
          onPress={this.props.goToGroupMemberAdd}
          title='Add new member'
        />
        <Button
          onPress={this.props.goToGroupLeave}
          title='Leave group'
        />
        <Button
          onPress={this.props.goToHome}
          title='Home'
        />
      </View>
    )
  }
}
