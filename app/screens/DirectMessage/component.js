import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Icon, Input, ListItem, Overlay } from 'react-native-elements'
import { ActionBar, MessageCloud, NavigationView } from 'hg/components'
import { app, colors, dimensions } from 'hg/constants'
import {
  deleteMessageGroup,
  readContact,
  readDirectMessageGroupRecipientSid,
  readMessages,
  updateContactStatus
} from 'hg/db'
import { formatPhoneNumber } from 'hg/utils'

export default class DirectMessage extends Component {
  static navigationOptions = ({ navigation }) => {
    const recipientName = navigation.getParam('recipientName', 'Direct message')
    const title = `${recipientName}`
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

  static propTypes = {
    currentUserSid: PropTypes.string.isRequired,
    goToContactEdit: PropTypes.func.isRequired,
    messagingSendRequest: PropTypes.func.isRequired
  }

  state = {
    groupId: 0,
    intervalId: 0,
    isInputFocused: false,
    isMoreOverlayVisible: false,
    message: '',
    messages: [],
    messagesRef: null,
    recipientSid: ''
  }

  render() {
    let rightActionIconName = ''
    let rightActionOnPress = () => {}

    if (!this.state.isInputFocused) {
      rightActionIconName = 'keyboard-arrow-up'
      rightActionOnPress = () => this.inputRef.focus()
    }
    else if (this.state.message) {
      rightActionIconName = 'clear'
      rightActionOnPress = () => this.setState({ message: '' })
    }
    else {
      rightActionIconName = 'keyboard-arrow-down'
      rightActionOnPress = () => this.inputRef.blur()
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
            if (!payload.action || !payload.action.params) return

            const groupId = payload.action.params.groupId
            this.setState({ groupId })
            this.updateRecipientSid(groupId)
            this.updateMessages()

            const intervalId = setInterval(() => {
              this.updateMessages()
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
          onContentSizeChange={() => this.messagesRef.scrollToEnd({ animated: true })}
          onLayout={() => this.messagesRef.scrollToEnd({ animated: true })}
          ref={ref => this.messagesRef = ref}
          keyExtractor={(message) => (message.id.toString())}
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
          ref={(ref) => this.inputRef = ref}
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
                this.inputRef.focus()
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
                  const contactSid = this.state.recipientSid
                  if (!contactSid) return

                  this.props.goToContactEdit(contactSid)
                  this.setState({ isMoreOverlayVisible: false })
                }
              }
              title='Edit contact'
            />
            <ListItem
              onPress={
                () => {
                  const contactSid = this.state.recipientSid
                  if (!contactSid) return

                  updateContactStatus(contactSid, 1)
                    .then(() => {
                      return deleteMessageGroup(this.state.groupId)
                    })
                    .then(() => {
                      this.setState({ isMoreOverlayVisible: false })
                      this.props.navigation.goBack()
                    })
                }
              }
              title='Remove contact'
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
    this.updateRecipientSid(this.state.groupId)
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
      })
  }

  updateRecipientSid(groupId) {
    readDirectMessageGroupRecipientSid(groupId)
      .then((recipientSid) => {
        this.setState({ recipientSid })
        return readContact(recipientSid)
      })
      .then((contact) => {
        if (!contact) return

        const split = contact.sid.split('.')
        const countryCode = split[0]
        const phoneNumber = split[1]
        let recipientName = formatPhoneNumber(countryCode, phoneNumber)

        if (contact.name) {
          recipientName = contact.name
        }

        this.props.navigation.setParams({ recipientName })
      })
  }
}
