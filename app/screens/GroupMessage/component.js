import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, TextInput, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { colors } from 'hg/constants'
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
            }
          }
        />
        <Text>Group ID: {this.state.groupId}</Text>
        <Button
          onPress={this.props.goToGroupMemberAdd}
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
        <TextInput
          autoFocus={true}
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
            }
          }
          title='Send'
        />
      </View>
    )
  }
}
