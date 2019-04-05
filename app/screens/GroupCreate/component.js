import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { colors } from 'hg/constants'
import { readContacts } from 'hg/db'

export default class GroupCreate extends Component {
  static navigationOptions = {
    headerTitle: 'New group'
  }

  static propTypes = {}

  state = {
    added: new Set(),
    contacts: []
  }

  render() {
    return (
      <View
        style={
          {
            flex: 1
          }
        }
      >
        <NavigationEvents
          onWillFocus={
            () => {
              readContacts()
                .then((contacts) => {
                  this.setState({ contacts })
                })
            }
          }
        />
        <FlatList
          data={[...this.state.added]}
          keyExtractor={(sid) => (sid.toString())}
          renderItem={
            (item) => {
              return (
                <View>
                  <Text>{item.item}</Text>
                  <Button
                    color={colors.GOOGLE_RED}
                    onPress={
                      () => {
                        const added = new Set(this.state.added)
                        added.delete(item.item)
                        this.setState({ added })
                      }
                    }
                    title='Remove'
                  />
                </View>
              )
            }
          }
        />
        <FlatList
          data={this.state.contacts}
          keyExtractor={(contact) => (contact.id.toString())}
          renderItem={
            (item) => {
              return (
                <View>
                  <Text>{item.item.sid}</Text>
                  <Button
                    onPress={
                      () => {
                        const added = new Set(this.state.added)
                        added.add(item.item.sid)
                        this.setState({ added })
                      }
                    }
                    title='Add'
                  />
                </View>
              )
            }
          }
        />
        <Button
          onPress={this.props.goToGroupInfo}
          title='Proceed'
        />
      </View>
    )
  }
}
