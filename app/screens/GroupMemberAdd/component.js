import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ActionBar, ContactSnippet, NavigationView } from 'hg/components'
import { readContacts } from 'hg/db'

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
                  return contact.added
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
                      this.props.groupAddMemberRequest(this.state.groupId, item.item.sid)
                      this.props.goToGroupMessage(this.state.groupId)
                    }
                  }
                />
              )
            }
          }
        />
        <ActionBar
          leftActionIconName='arrow-back'
          leftActionOnPress={
            () => {
              this.props.navigation.goBack()
            }
          }
          mainActionIconName='not-interested'
          mainActionOnPress={
            () => {}
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
