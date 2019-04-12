import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { MessageGroupSnippet } from 'hg/components'
import { app, colors } from 'hg/constants'
import { readIsDirectMessage, readMessageGroups } from 'hg/db'

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
          flex: 1
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
                      const groupId = item.item.id
                      readIsDirectMessage(groupId)
                        .then((isDirectMessage) => {
                          if (isDirectMessage) {
                            this.props.goToDirectMessage(groupId)
                          }
                          else {
                            this.props.goToGroupMessage(groupId)
                          }
                        })
                    }
                  }
                  userSid={this.props.currentUserSid}
                />
              )
            }
          }
        />
        <View
          style={
            {
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              left: 0,
              position: 'absolute',
              right: 0
            }
          }
        >
          <Icon
            color={colors.BOLD_GREEN}
            name='fingerprint'
            onPress={this.props.goToContact}
            raised
            reverse
            type='material'
          />
        </View>
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
