import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ActionBar, ContactSnippet, NavigationView } from 'hg/components'
import { app } from 'hg/constants'
import { readContacts, readMessageGroupContacts } from 'hg/db'
import { getCurrentTimestamp } from 'hg/utils'

export default class GroupMemberAdd extends Component {
  static navigationOptions = {
    headerTitle: 'New member'
  }

  static propTypes = {}

  state = {
    contacts: [],
    groupId: 0,
    intervalId: 0
  }

  render() {
    return (
      <NavigationView
        onWillBlur={
          () => {
            clearInterval(this.state.intervalId)
          }
        }
        onWillFocus={
          (payload) => {
            if (payload.action && payload.action.params) {
              const groupId = payload.action.params.groupId
              this.setState({ groupId })
            }

            const intervalId = setInterval(
              () => {
                Promise.all([readContacts(), readMessageGroupContacts(this.state.groupId)])
                  .then(([contacts, groupContacts]) => {
                    const nonMembers = contacts.filter((contact) => {
                      return (
                        contact.status === 0
                        &&
                        contact.sid !== this.props.currentUserSid
                        &&
                        !groupContacts.includes(contact.sid)
                      )
                    })
                    this.setState({ contacts: nonMembers })
                  })
              },
              app.INTERVAL
            )
            this.setState({ intervalId })
          }
        }
      >
        <FlatList
          data={this.state.contacts}
          keyExtractor={(contact) => (contact.sid)}
          renderItem={
            (item) => {
              return (
                <ContactSnippet
                  contact={item.item}
                  onPress={
                    () => {
                      const actionId = getCurrentTimestamp()
                      this.props.groupAddMemberRequest(
                        actionId,
                        this.state.groupId,
                        item.item.sid
                      )
                      this.props.goToGroupMessage(this.state.groupId)
                    }
                  }
                />
              )
            }
          }
        />
        <ActionBar
          mainActionIconName='arrow-back'
          mainActionOnPress={
            () => {
              this.props.navigation.goBack()
            }
          }
        />
      </NavigationView>
    )
  }
}
