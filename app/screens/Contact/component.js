import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation';
import { ContactSnippet } from 'hg/components'
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
                <ContactSnippet
                  contact={item.item}
                  onPress={() => {}}
                />
              )
            }
          }
        />
        <View
          style={
            {
              backgroundColor: colors.TRANSLUCENT_WHITE,
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
