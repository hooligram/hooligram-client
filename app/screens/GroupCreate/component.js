import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, Keyboard, Text, ToastAndroid } from 'react-native'
import { Input } from 'react-native-elements'
import { ActionBar, ContactSnippet, NavigationView } from 'hg/components'
import { dimensions, fontSizes } from 'hg/constants'
import { readContacts } from 'hg/db'
import { constructSid, getCurrentTimestamp } from 'hg/utils'

export default class GroupCreate extends Component {
  static navigationOptions = {
    headerTitle: 'New group'
  }

  static propTypes = {
    countryCode: PropTypes.string.isRequired,
    groupCreateRequest: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }

  state = {
    added: new Set(),
    contacts: [],
    groupName: ''
  }

  render() {
    let helpText = ''

    if (this.state.added.size < 1) {
      helpText = 'Add at least 2 participants.'
    }
    else if (this.state.added.size === 1) {
      helpText = 'Add one more participant.'
    }
    else {
      helpText = `Added ${this.state.added.size} participants.`
    }

    let rightActionIconName = 'clear'
    let rightActionOnPress = () => {}

    if (this.state.added.size > 0) {
      rightActionOnPress = () => {
        this.setState({ added: new Set() })
      }
    }
    else if (this.state.groupName.length > 0) {
      rightActionOnPress = () => {
        this.setState({ groupName: '' })
      }
    }
    else {
      rightActionOnPress = () => {
        ToastAndroid.showWithGravity(
          'Everything is cleared up.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        )
        Keyboard.dismiss()
      }
    }

    return (
      <NavigationView
        onWillFocus={
          () => {
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
        <Input
          autoFocus={false}
          inputStyle={
            {
              fontSize: fontSizes.LARGE
            }
          }
          onChangeText={
            (text) => {
              this.setState({ groupName: text })
            }
          }
          ref={(ref) => this.groupNameInputRef = ref}
          value={this.state.groupName}
        />
        <Text
          style={
            {
              paddingVertical: dimensions.PADDING,
              textAlign: 'center'
            }
          }
        >
          {helpText}
        </Text>
        <FlatList
          data={[...this.state.contacts]}
          keyExtractor={(contact) => (contact.sid.toString())}
          renderItem={
            (item) => {
              const isAdded = this.state.added.has(item.item.sid)

              return (
                <ContactSnippet
                  contact={{ sid: item.item.sid }}
                  isSelected={isAdded}
                  onPress={
                    () => {
                      const added = new Set(this.state.added)

                      if (isAdded) {
                        added.delete(item.item.sid)
                      }
                      else {
                        added.add(item.item.sid)
                      }

                      this.setState({ added })
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
          mainActionIconName='done'
          mainActionOnPress={
            () => {
              if (this.state.added.size < 2) {
                ToastAndroid.showWithGravity(helpText, ToastAndroid.SHORT, ToastAndroid.CENTER)
                return
              }

              if (this.state.groupName === '') {
                ToastAndroid.showWithGravity(
                  'Enter the group name.',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                )
                this.groupNameInputRef.focus()
                return
              }

              const actionId = getCurrentTimestamp()
              const currentUserSid = constructSid(this.props.countryCode, this.props.phoneNumber)
              this.props.groupCreateRequest(
                actionId,
                this.state.groupName,
                [...this.state.added, currentUserSid]
              )
            }
          }
          rightActionIconName={rightActionIconName}
          rightActionOnPress={rightActionOnPress}
        />
      </NavigationView>
    )
  }
}
