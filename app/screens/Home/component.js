import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { MessageGroupSnippet } from 'hg/components'
import { app, colors } from 'hg/constants'
import { readMessageGroups } from 'hg/db'

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Hooligram'
  }

  static propTypes = {}

  state = {
    intervalId: 0,
    messageGroups: []
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <NavigationEvents
          onWillBlur={
            () => {
              clearInterval(this.state.intervalId)
            }
          }
          onWillFocus={
            () => {
              this.updateMessageGroups()

              const intervalId = setInterval(() => {
                this.updateMessageGroups()
              }, app.UPDATE_INTERVAL)

              this.setState({ intervalId })
            }
          }
        />
        <Button
          onPress={this.props.goToContact}
          title='Contacts'
        />
        <FlatList
          data={this.state.messageGroups}
          keyExtractor={(messageGroup) => (messageGroup.id.toString())}
          renderItem={
            (item) => {
              return (
                <MessageGroupSnippet
                  messageGroup={item.item}
                  onPress={
                    () => {
                      this.props.goToGroupMessage(item.item.id)
                    }
                  }
                  userSid={this.props.currentUserSid}
                />
              )
            }
          }
        />
        <Button
          color={colors.GOOGLE_RED}
          onPress={this.props.signOut}
          title='Sign out'
        />
      </View>
    )
  }

  updateMessageGroups() {
    readMessageGroups()
      .then((messageGroups) => {
        this.setState({ messageGroups })
      })
  }
}
