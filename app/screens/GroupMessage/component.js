import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Icon, Input, ListItem, Overlay } from 'react-native-elements'
import { ActionBar, MessageCloud, NavigationView } from 'hg/components'
import { app, colors, dimensions } from 'hg/constants'
import {
  readContact,
  readMessageGroup,
  readMessageGroupContacts,
  readMessages
} from 'hg/db'

const contactSidName = {}

export default class GroupMessage extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('groupName', 'Group message')
    return {
      headerRight: (
        <Icon
          color={colors.TEAL}
          name='more-vert'
          onPress={navigation.getParam('onPressHeaderRight', () => {})}
          type='material'
        />
      ),
      headerTitle: title,
    }
  }

  static propTypes = {}

  state = {
    groupId: 0,
    intervalId: 0,
    isInputFocused: false,
    isMoreOverlayVisible: false,
    messages: [],
    message: ''
  }

  messageRef = null
  messagesRef = null

  render() {
    let rightActionIconName = ''
    let rightActionOnPress = () => {}

    if (!this.state.isInputFocused) {
      rightActionIconName = 'keyboard-arrow-up'
      rightActionOnPress = () => this.messageRef.focus()
    }
    else if (this.state.message) {
      rightActionIconName = 'clear'
      rightActionOnPress = () => this.setState({ message: '' })
    }
    else {
      rightActionIconName = 'keyboard-arrow-down'
      rightActionOnPress = () => this.messageRef.blur()
    }

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

            this.updateMessages()
            const intervalId = setInterval(() => {
              this.updateMessages()
              readMessageGroup(this.state.groupId)
                .then((messageGroup) => {
                  this.props.navigation.setParams({
                    groupName: messageGroup.name
                  })
                })
            }, app.INTERVAL)
            this.setState({ intervalId })
          }
        }
        style={
          {
            padding: dimensions.PADDING
          }
        }
      >
        <FlatList
          data={this.state.messages}
          keyExtractor={(message) => (message.id.toString())}
          onContentSizeChange={() => this.messagesRef.scrollToEnd({ animated: true })}
          onLayout={() => this.messagesRef.scrollToEnd({ animated: true })}
          ref={(ref) => this.messagesRef = ref}
          renderItem={
            (item) => {
              return (
                <View
                  style={
                    {
                      marginBottom: dimensions.MARGIN
                    }
                  }
                >
                  <MessageCloud
                    isOwnMessage={item.item.sender_sid === this.props.currentUserSid}
                    message={
                      {
                        content: item.item.content,
                        dateCreated: item.item.date_created
                      }
                    }
                    senderName={contactSidName[item.item.sender_sid]}
                  />
                </View>
              )
            }
          }
        />
        <Input
          containerStyle={
            {
              paddingBottom: dimensions.LENGTH_50
            }
          }
          onBlur={
            () => {
              this.setState({ isInputFocused: false })
            }
          }
          onChangeText={
            (text) => {
              this.setState({ message: text })
            }
          }
          onFocus={
            () => {
              this.setState({ isInputFocused: true })
            }
          }
          ref={(ref) => this.messageRef = ref}
          value={this.state.message}
        />
        <ActionBar
          leftActionIconName='arrow-back'
          leftActionOnPress={
            () => {
              this.props.navigation.goBack()
            }
          }
          mainActionIconName='send'
          mainActionOnPress={
            () => {
              if (!this.state.message) {
                this.messageRef.focus()
                return
              }

              this.props.messagingSendRequest(this.state.groupId, this.state.message)
              this.updateMessages()
              this.setState({ message: '' })
            }
          }
          rightActionIconName={rightActionIconName}
          rightActionOnPress={rightActionOnPress}
        />
        <Overlay
          height='auto'
          isVisible={this.state.isMoreOverlayVisible}
        >
          <View>
            <ListItem
              onPress={
                () => {
                  this.props.goToGroupMemberAdd(this.state.groupId)
                  this.setState({ isMoreOverlayVisible: false })
                }
              }
              title='Add group member'
            />
            <ListItem
              onPress={
                () => {
                  this.props.goToGroupLeave(this.state.groupId)
                  this.setState({ isMoreOverlayVisible: false })
                }
              }
              title='Leave group'
            />
            <ListItem
              onPress={
                () => {
                  this.setState({ isMoreOverlayVisible: false })
                }
              }
              title='Close'
            />
          </View>
        </Overlay>
      </NavigationView>
    )
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressHeaderRight: () => {
        this.setState({ isMoreOverlayVisible: true })
      }
    })
  }

  updateMessages() {
    readMessages(this.state.groupId)
      .then((messages) => {
        this.setState({ messages })
        return readMessageGroupContacts(this.state.groupId)
      })
      .then((contactSids) => {
        contactSids.forEach((contactSid) => {
          readContact(contactSid)
            .then((contact) => {
              contactSidName[contact.sid] = contact.name
            })
        })
      })
  }
}
