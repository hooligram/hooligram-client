import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, TextInput, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { app, colors } from 'hg/constants'
import { readIsDirectMessage, readMessages } from 'hg/db'
import { getCurrentTimestamp } from 'hg/utils'

export default class GroupMessage extends Component {
  static navigationOptions = ({ navigation }) => {
    const groupId = navigation.getParam('groupId', 0)
    const title = `Group message #${groupId}`
    return {
      title
    }
  }

  static propTypes = {}

  state = {
    groupId: 0,
    intervalId: 0,
    isDirectMessage: false,
    messages: [],
    text: ''
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1
        }}
      >
        <NavigationEvents
          onWillFocus={
            (payload) => {
              if (!payload.action || !payload.action.params) return

              const groupId = payload.action.params.groupId
              this.setState({ groupId })

              this.updateMessages()
              const intervalId = setInterval(() => {
                this.updateMessages()
              }, app.UPDATE_INTERVAL)
              this.setState({ intervalId })

              readIsDirectMessage(groupId)
                .then((isDirectMessage) => {
                  this.setState({ isDirectMessage })
                })
            }
          }
          onWillBlur={
            () => {
              clearInterval(this.state.intervalId)
            }
          }
        />
        <Text>Group ID: {this.state.groupId}</Text>
        <Text>is direct message: {this.state.isDirectMessage ? 'true' : 'false'}</Text>
        <Button
          onPress={
            () => {
              this.props.goToGroupMemberAdd(this.state.groupId)
            }
          }
          title='Add new member'
        />
        <Button
          onPress={() => {
            this.props.goToGroupLeave(this.state.groupId)
          }}
          title='Leave group'
        />
        <Button
          onPress={this.props.goToHome}
          title='Home'
        />
        <FlatList
          data={this.state.messages}
          keyExtractor={(message) => (message.id.toString())}
          onContentSizeChange={() => this.messagesRef.scrollToEnd({ animated: true })}
          onLayout={() => this.messagesRef.scrollToEnd({ animated: true })}
          ref={ref => this.messagesRef = ref}
          renderItem={
            (item) => {
              return (
                <View>
                  <Text>{item.item.content}</Text>
                </View>
              )
            }
          }
        />
        <TextInput
          onChangeText={
            (text) => {
              this.setState({ text })
            }
          }
          style={
            {
              backgroundColor: 'red'
            }
          }
          value={this.state.text}
        />
        <Button
          onPress={
            () => {
              const actionId = getCurrentTimestamp()
              this.props.messagingSendRequest(actionId, this.state.groupId, this.state.text)
              this.setState({ text: '' })
            }
          }
          title='Send'
        />
      </View>
    )
  }

  // componentDidMount() {
  //   this.updateMessages()
  //   const intervalId = setInterval(() => {
  //     this.updateMessages()
  //   }, app.UPDATE_INTERVAL)
  //   this.setState({ intervalId })
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.intervalId)
  // }

  updateMessages() {
    readMessages(this.state.groupId)
      .then((messages) => {
        this.setState({ messages })
      })
  }
}
