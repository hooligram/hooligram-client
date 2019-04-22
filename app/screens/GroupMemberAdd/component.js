import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ActionBar, ContactSnippet, NavigationView } from 'hg/components'
import { readContacts } from 'hg/db'
import { getCurrentTimestamp } from 'hg/utils'

export default class GroupMemberAdd extends Component {
  static navigationOptions = {
    headerTitle: 'New member'
  }

  static propTypes = {}

  state = {
    contacts: [],
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

            readContacts()
              .then((contacts) => {
                const added = contacts.filter((contact) => {
                  return contact.status === 0 && contact.sid !== this.props.currentUserSid
                })
                this.setState({ contacts: added })
              })
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
