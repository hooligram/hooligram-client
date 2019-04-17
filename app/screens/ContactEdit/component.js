import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input } from 'react-native-elements'
import { ActionBar, NavigationView } from 'hg/components'
import { colors, dimensions, fontSizes } from 'hg/constants'
import { readContact, updateContactName } from 'hg/db'
import { getFlagEmoji } from 'hg/utils'

export default class ContactCreate extends Component {
  static navigationOptions = {
    headerTitle: 'Edit contact'
  }

  static propTypes = {}

  state = {
    contactSid: '',
    name: ''
  }

  render() {
    const phoneNumber = this.state.contactSid.split('.')[1]

    return (
      <NavigationView
        onWillFocus={
          (payload) => {
            if (!payload.action || !payload.action.params) return

            const contactSid = payload.action.params.contactSid
            this.setState({ contactSid })

            readContact(contactSid)
              .then((contact) => {
                this.setState({ name: contact.name })
              })
          }
        }
      >
        <View
          style={
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }
          }
        >
          <Text
            style={
              {
                color: colors.BLACK,
                fontSize: fontSizes.LARGE,
                textAlign: 'center',
                width: dimensions.LENGTH_50
              }
            }
          >
            {getFlagEmoji(this.state.contactSid)}
          </Text>
          <Text
            style={
              {
                fontSize: fontSizes.XXLARGE
              }
            }
          >
            {phoneNumber}
          </Text>
          <Text
            style={
              {
                width: dimensions.LENGTH_50
              }
            }
          />
        </View>
        <Input
          autoFocus={true}
          label='Name'
          onChangeText={
            (text) => {
              this.setState({ name: text })
            }
          }
          value={this.state.name}
        />
        <ActionBar
          leftActionIconName='arrow-back'
          leftActionOnPress={
            () => {
              this.props.navigation.goBack()
            }
          }
          mainActionIconName='done'
          mainActionOnPress={
            () => {
              const contactSid = this.state.contactSid
              const name = this.state.name

              if (!contactSid || !name) return

              updateContactName(contactSid, name)
                .then(() => {
                  const shouldGoBack = this.props.navigation.getParam('goBack', false)

                  if (shouldGoBack) {
                    this.props.navigation.goBack()
                  }
                  else {
                    this.props.goToContact()
                  }
                })
            }
          }
        />
      </NavigationView>
    )
  }
}
