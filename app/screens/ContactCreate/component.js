import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Picker, Text, TextInput, View } from 'react-native'
import { colors, countryCodes } from 'hg/constants'
import { createContact } from 'hg/db'
import { constructSid } from 'hg/utils'

export default class ContactCreate extends Component {
  static navigationOptions = {
    headerTitle: 'New contact'
  }

  static propTypes = {}

  state = {
    phoneNumber: '',
    selection: 0
  }

  render() {
    return (
      <View
        style={
          {
            backgroundColor: colors.WHITE,
            flex: 1
          }
        }
      >
        <Picker
          onValueChange={
            (_, position) => {
              this.setState({ selection: position })
            }
          }
          selectedValue={this.state.selection}
        >
          {
            countryCodes.map((country, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={country.name}
                  value={index}
                />
              )
            })
          }
        </Picker>
        <Text>+{countryCodes[this.state.selection].code}</Text>
        <TextInput
          autoFocus={true}
          keyboardType='numeric'
          onChangeText={
            (text) => {
              this.setState({ phoneNumber: text })
            }
          }
          value={this.state.phoneNumber}
        />
        <Button
          onPress={
            () => {
              const countryCode = countryCodes[this.state.selection].code
              const sid = constructSid(countryCode, this.state.phoneNumber)
              createContact(sid)
                .then(() => {
                  this.props.goToContact()
                })
            }
          }
          title='Create'
        />
      </View>
    )
  }
}
