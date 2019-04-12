import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Icon, Input, ListItem, Overlay } from 'react-native-elements'
import { ActionBar, MessageCloud, NavigationView } from 'hg/components'
import { app, colors, dimensions } from 'hg/constants'
import { readDirectMessageGroupRecipientSid, readMessages } from 'hg/db'

export default class DirectMessage extends Component {
  static navigationOptions = ({ navigation }) => {
    const recipientSid = navigation.getParam('recipientSid', 'Direct message')
    const title = `${recipientSid}`
    return {
      headerRight: (
        <Icon
          color={colors.BOLD_GREEN}
          name='more-vert'
          onPress={navigation.getParam('onPressHeaderRight', () => {})}
          type='material'
        />
      ),
      headerTitle: title,
    }
  }

  state = {
    groupId: 0,
    intervalId: 0,
    isInputFocused: false,
    isMoreOverlayVisible: false,
    message: '',
    messages: [],
    messagesRef: null
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
            }, app.UPDATE_INTERVAL)
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
                    currentUserSid={this.props.currentUserSid}
                    message={item.item}
                  />
                </View>
              )
            }
          }
        />
        <Input
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
              if (!this.state.message) return

              this.props.messagingSendRequest(this.state.groupId, this.state.message)
              this.updateMessages()
              this.setState({ message: '' })
            }
          }
          rightActionIconName={rightActionIconName}
          rightActionOnPress={rightActionOnPress}
        />
        <Overlay
          isVisible={this.state.isMoreOverlayVisible}
        >
          <View>
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
        this.props.navigation.setParams({ recipientSid })
      })
  }
}
