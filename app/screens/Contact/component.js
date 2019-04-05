import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation';
import { colors, dimensions, fontSizes } from 'hg/constants'
import { deleteContact, readContacts } from 'hg/db'

export default class Contact extends Component {
  static navigationOptions = {
    headerTitle: 'Contacts'
  }

  static propTypes = {}

  state = {
    contacts: []
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
            () => {
              readContacts()
                .then((contacts) => {
                  this.setState({ contacts })
                })
            }
          }
        />
        <Button
          onPress={this.props.goToGroupCreate}
          title='New group'
        />
        <Button
          onPress={this.props.goToContactCreate}
          title='New contact'
        />
        <FlatList
          data={this.state.contacts}
          keyExtractor={
            (contact) => {
              return contact.id.toString()
            }
          }
          renderItem={
            (item) => {
              return (
                <View
                  style={
                    {
                      padding: dimensions.PADDING
                    }
                  }
                >
                  <Text>{item.item.sid}</Text>
                  <View
                    style={
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }
                    }
                  >
                    <Button
                      onPress={this.props.goToGroupMessage}
                      title='Message'
                    />
                    <Button
                      onPress={
                        () => {
                          deleteContact(item.item.id)
                            .then(() => {
                              return readContacts()
                            })
                            .then((contacts) => {
                              this.setState({ contacts })
                            })
                        }
                      }
                      title='Remove'
                    />
                  </View>
                </View>
              )
            }
          }
        />
      </View>
    )
  }
}
