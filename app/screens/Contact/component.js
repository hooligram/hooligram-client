import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation';
import { app, colors, dimensions, fontSizes } from 'hg/constants'
import { readContacts, updateContactAdded } from 'hg/db'

export default class Contact extends Component {
  static navigationOptions = {
    headerTitle: 'Contacts'
  }

  static propTypes = {}

  state = {
    contacts: [],
    intervalId: 0
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1
        }}
      >
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
              return contact.sid
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
                      onPress={
                        () => {
                        }
                      }
                      title='Message'
                    />
                    <Button
                      color={colors.GOOGLE_RED}
                      onPress={
                        () => {
                          updateContactAdded(item.item.sid, false)
                            .then(() => {
                              this.updateContacts()
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

  componentDidMount() {
    this.updateContacts()
    const intervalId = setInterval(() => {
      this.updateContacts()
    }, app.UPDATE_INTERVAL)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  updateContacts() {
    readContacts()
      .then((contacts) => {
        const added = contacts.filter((contact) => {
          return contact.added
        })
        this.setState({ contacts: added })
      })
  }
}
