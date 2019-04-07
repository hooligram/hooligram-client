import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { groupAddMemberRequest } from 'hg/actions/group'
import { colors } from 'hg/constants'
import { readContacts } from 'hg/db'

export default class GroupMemberAdd extends Component {
  static navigationOptions = {
    headerTitle: 'New member'
  }

  static propTypes = {}

  state = {
    contacts: [],
    groupId: 0
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
        <Text>{this.state.groupId}</Text>
        <FlatList
          data={this.state.contacts}
          keyExtractor={(contact) => (contact.sid)}
          renderItem={
            (item) => {
              return (
                <View>
                  <Text>{item.item.sid}</Text>
                  <Button
                    onPress={
                      () => {
                        groupAddMemberRequest(this.state.groupId, item.item.sid)
                        this.props.goToGroupMessage(this.state.groupId)
                      }
                    }
                    title='Add'
                  />
                </View>
              )
            }
          }
        />
      </View>
    )
  }

  componentDidMount() {
    readContacts()
      .then((contacts) => {
        const added = contacts.filter((contact) => {
          return contact.added
        })
        this.setState({ contacts: added })
      })
  }
}
