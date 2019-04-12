import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Input } from 'react-native-elements'
import { ActionBar, ContactSnippet } from 'hg/components'
import { fontSizes } from 'hg/constants'
import { constructSid, getCurrentTimestamp } from 'hg/utils'

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
          flex: 1
        }}
      >
        <Input
          autoFocus={true}
          onChangeText={
            (text) => {
              this.setState({ groupName: text })
            }
          }
          inputStyle={
            {
              fontSize: fontSizes.LARGE
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
                <ContactSnippet
                  contact={{ sid: item.item }}
                  onPress={
                    () => {}
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
          mainActionIconName='check'
          mainActionOnPress={
            () => {
              if (memberSids.length < 1) return

              const actionId = getCurrentTimestamp()
              const currentUserSid = constructSid(this.props.countryCode, this.props.phoneNumber)
              this.props.groupCreateRequest(
                actionId,
                this.state.groupName,
                [...memberSids, currentUserSid]
              )
            }
          }
          rightActionIconName='clear'
          rightActionOnPress={
            () => {
              this.setState({ groupName: '' })
            }
          }
        />
      </View>
    )
  }
}
