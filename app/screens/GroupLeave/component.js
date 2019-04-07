import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { colors } from 'hg/constants'
import { deleteMessageGroup } from 'hg/db'

export default class GroupLeave extends Component {
  static navigationOptions = {
    headerTitle: 'Leave group'
  }

  static propTypes = {}

  state = {
    groupId: 0
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1
        }}
      >
        <Text>{this.state.groupId}</Text>
        <NavigationEvents
          onWillFocus={
            (payload) => {
              if (!payload.action || !payload.action.params) return

              const groupId = payload.action.params.groupId
              this.setState({ groupId })
            }
          }
        />
        <Button
          onPress={
            () => {
              deleteMessageGroup(this.state.groupId)
                .then(() => {
                  this.props.goToHome()
                })
            }
          }
          title='Confirm'
        />
      </View>
    )
  }
}
