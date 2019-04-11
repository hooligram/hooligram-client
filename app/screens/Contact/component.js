import React, { Component } from 'react'
import { FlatList, ToastAndroid, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { ContactSnippet } from 'hg/components'
import { colors } from 'hg/constants'
import { readContactDirectMessageGroupId, readContacts, updateContactAdded } from 'hg/db'
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
      <View
        style={{
          flex: 1
        }}
      >
        <NavigationEvents
          onWillFocus={
            () => {
              this.updateContacts()
            }
          }
        />
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
                      updateContactAdded(item.item.sid, false)
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
        <View
          style={
            {
              backgroundColor: colors.TRANSLUCENT_WHITE,
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              left: 0,
              position: 'absolute',
              right: 0
            }
          }
        >
          <Icon
            color={colors.BOLD_GREEN}
            name='arrow-back'
            onPress={
              () => {
                this.props.navigation.goBack()
              }
            }
            raised
            type='material'
          />
          <Icon
            color={colors.BOLD_GREEN}
            name='group-add'
            onPress={this.props.goToGroupCreate}
            raised
            reverse
            type='material'
          />
          <Icon
            color={colors.BOLD_GREEN}
            name='person-add'
            onPress={this.props.goToContactCreate}
            raised
            type='material'
          />
        </View>
      </View>
    )
  }

  updateContacts() {
    readContacts()
      .then((contacts) => {
        const added = contacts.filter((contact) => {
          return contact.added
        })
        this.setState({ contacts: added })
      })
  }
}
