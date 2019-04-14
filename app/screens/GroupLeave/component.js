import React, { Component } from 'react'
import { ActionBar, NavigationView } from 'hg/components'
import { deleteMessageGroup } from 'hg/db'
import { getCurrentTimestamp } from 'hg/utils'

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
      <NavigationView
        onWillFocus={
          (payload) => {
            if (!payload.action || !payload.action.params) return

            const groupId = payload.action.params.groupId
            this.setState({ groupId })
          }
        }
        style={
          {
            justifyContent: 'flex-end'
          }
        }
      >
        <ActionBar
          leftActionIconName='arrow-back'
          leftActionOnPress={
            () => {
              this.props.navigation.goBack()
            }
          }
          mainActionIconName='check'
          mainActionOnPress={
            () => {
              const actionId = getCurrentTimestamp()
              this.props.groupLeaveRequest(actionId, this.state.groupId)
              deleteMessageGroup(this.state.groupId)
                .then(() => {
                  this.props.goToHome()
                })
            }
          }
          rightActionIconName='not-interested'
          rightActionOnPress={
            () => {}
          }
        />
      </NavigationView>
    )
  }
}
