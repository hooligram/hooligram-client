import React, { Component } from 'react'
import { FlatList, ToastAndroid, View } from 'react-native'
import { ActionBar, ContactSnippet, NavigationView } from 'hg/components'
import { readContactDirectMessageGroupId, readContacts } from 'hg/db'
import { getCurrentTimestamp } from 'hg/utils'

export default class Contact extends Component {
  static navigationOptions = {
    headerTitle: 'Contacts'
  }

  static propTypes = {}

  state = {
    contacts: []
  }

  render() {
    return (
      <NavigationView
        onWillFocus={
          () => {
            this.updateContacts()
          }
        }
      >
        <FlatList
          data={this.state.contacts}
          keyExtractor={
            (contact) => {
              return contact.sid
            }
          }
          renderItem={
            (item) => {
              return (
                <ContactSnippet
                  contact={item.item}
                  onLongPress={
                    () => {
                      updateContactStatus(item.item.sid, 1)
                        .then(() => {
                          this.updateContacts()
                          ToastAndroid.show(`Removed ${item.item.sid}`, ToastAndroid.SHORT);
                        })
                    }
                  }
                  onPress={() => {
                    const contactSid = item.item.sid
                    readContactDirectMessageGroupId(contactSid)
                      .then((groupId) => {
                        if (groupId > 0) return this.props.goToDirectMessage(groupId)

                        const actionId = getCurrentTimestamp()
                        const groupName = contactSid
                        const memberSids = [this.props.currentUserSid, contactSid]

                        this.props.groupCreateRequest(actionId, groupName, memberSids)
                      })
                  }}
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
          mainActionIconName='group-add'
          mainActionOnPress={
            () => {
              this.props.goToGroupCreate()
            }
          }
          rightActionIconName='person-add'
          rightActionOnPress={
            () => {
              this.props.goToContactCreate()
            }
          }
        />
      </NavigationView>
    )
  }

  updateContacts() {
    readContacts()
      .then((contacts) => {
        const added = contacts.filter((contact) => {
          return contact.status === 0 && contact.sid !== this.props.currentUserSid
        })
        this.setState({ contacts: added })
      })
  }
}
