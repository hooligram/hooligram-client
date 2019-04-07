import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
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
          onWillFocus={
            () => {
              readMessageGroups()
                .then((messageGroups) => {
                  this.setState({ messageGroups })
                })
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
                <View>
                  <Text>{item.item.name}</Text>
                  <Button
                    onPress={
                      () => {
                        this.props.goToGroupMessage(item.item.id)
                      }
                    }
                    title='Join'
                  />
                </View>
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

  componentDidMount() {
    this.updateMessageGroups()
    const intervalId = setInterval(() => {
      this.updateMessageGroups()
    }, app.UPDATE_INTERVAL)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  updateMessageGroups() {
    readMessageGroups()
      .then((messageGroups) => {
        this.setState({ messageGroups })
      })
  }
}
