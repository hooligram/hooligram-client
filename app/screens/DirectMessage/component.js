import React, { Component } from 'react'
import { Text } from 'react-native'
import { NavigationView } from 'hg/components'
import { readDirectMessageGroupRecipientSid } from 'hg/db'

export default class DirectMessage extends Component {
  static navigationOptions = ({ navigation }) => {
    const recipientSid = navigation.getParam('recipientSid', 'Direct message')
    const title = `${recipientSid}`
    return {
      title
    }
  }

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
            this.updateRecipientSid(groupId)
          }
        }
      >
        <Text>Direct message #{this.state.groupId}</Text>
      </NavigationView>
    )
  }

  componentDidMount() {
    this.updateRecipientSid(this.state.groupId)
  }

  updateRecipientSid(groupId) {
    readDirectMessageGroupRecipientSid(groupId)
      .then((recipientSid) => {
        this.props.navigation.setParams({ recipientSid })
      })
  }
}
