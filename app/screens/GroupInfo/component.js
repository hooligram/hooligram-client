import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, TextInput, View } from 'react-native'
import { colors } from 'hg/constants'
import { createMessageGroup } from 'hg/db'
import { getCurrentTimestamp } from 'hg/utils'

export default class GroupInfo extends Component {
  static navigationOptions = {
    headerTitle: 'New group info'
  }

  static propTypes = {}

  state = {
    groupName: ''
  }

  render() {
    const memberSids = this.props.navigation.getParam('memberSids', [])

    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1
        }}
      >
        <TextInput
          autoFocus={true}
          onChangeText={
            (text) => {
              this.setState({ groupName: text })
            }
          }
          value={this.state.groupName}
        />
        <FlatList
          data={memberSids}
          keyExtractor={(sid) => (sid)}
          renderItem={
            (item) => {
              return (
                <View>
                  <Text>{item.item}</Text>
                </View>
              )
            }
          }
        />
        <Button
          onPress={
            () => {
              const actionId = getCurrentTimestamp()
              createMessageGroup(actionId, this.state.groupName, memberSids)
                .then(() => {
                  this.props.groupCreateRequest(actionId, this.state.groupName, memberSids)
                  this.props.goToHome()
                })
            }
          }
          title='Create'
        />
      </View>
    )
  }
}
