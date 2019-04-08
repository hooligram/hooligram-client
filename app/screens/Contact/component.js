import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
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
          flex: 1
        }}
      >
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
        <View
          style={
            {
              flexDirection: 'row',
              justifyContent: 'center'
            }
          }
        >
          <Icon
            color={colors.BOLD_GREEN}
            name='arrow-back'
            onPress={
              () => {
                this.props.navigation.goBack()
              }
            }
            raised
            type='material'
          />
          <Icon
            color={colors.BOLD_GREEN}
            name='group-add'
            onPress={this.props.goToGroupCreate}
            raised
            reverse
            type='material'
          />
          <Icon
            color={colors.BOLD_GREEN}
            name='person-add'
            onPress={this.props.goToContactCreate}
            raised
            type='material'
          />
        </View>
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
