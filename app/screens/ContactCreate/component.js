import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Picker, View } from 'react-native'
import { Icon, Input, Text } from 'react-native-elements'
import { colors, countryCodes, dimensions, fontSizes } from 'hg/constants'
import { createContact, updateContactAdded } from 'hg/db'
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
        <View
          style={
            {
              alignItems: 'center',
              flexDirection: 'row'
            }
          }
        >
          <Text
            style={
              {
                fontSize: fontSizes.LARGE,
                padding: dimensions.PADDING
              }
            }
          >
            +{countryCodes[this.state.selection].code}
          </Text>
          <Input
            autoFocus={true}
            keyboardType='numeric'
            onChangeText={
              (text) => {
                this.setState({ phoneNumber: text })
              }
            }
            value={this.state.phoneNumber}
          />
        </View>
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
            name='add'
            onPress={
              () => {
                const countryCode = countryCodes[this.state.selection].code
                const sid = constructSid(countryCode, this.state.phoneNumber)
                createContact(sid)
                  .then(() => {
                    updateContactAdded(sid)
                  })
                  .then(() => {
                    this.props.goToContact()
                  })
              }
            }
            raised
            reverse
            type='material'
          />
          <Icon
            color={colors.BOLD_GREEN}
            name='clear'
            onPress={
              () => {
                this.setState({ phoneNumber: '' })
              }
            }
            raised
            type='material'
          />
        </View>
      </View>
    )
  }
}
