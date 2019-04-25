import React, { Component } from 'react'
import { Picker, ToastAndroid, View } from 'react-native'
import { Input, Text } from 'react-native-elements'
import { ActionBar } from 'hg/components'
import { colors, countryCodes, dimensions, fontSizes } from 'hg/constants'
import { createContact, updateContactStatus } from 'hg/db'
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
          style={
            {
              alignSelf: 'center',
              minWidth: dimensions.PERCENT_50,
              width: dimensions.LENGTH_200
            }
          }
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
              flexDirection: 'row',
              justifyContent: 'center'
            }
          }
        >
          <Text
            style={
              {
                fontSize: fontSizes.LARGE,
                textAlign: 'center',
                width: dimensions.LENGTH_50
              }
            }
          >
            +{countryCodes[this.state.selection].code}
          </Text>
          <Input
            autoFocus={true}
            inputContainerStyle={
              {
                borderBottomWidth: dimensions.BORDER_WIDTH,
                borderColor: colors.WHITE_SMOKE
              }
            }
            inputStyle={
              {
                fontSize: fontSizes.XXLARGE
              }
            }
            keyboardType='numeric'
            onChangeText={
              (text) => {
                const phoneNumber = text.replace(/[^0-9]/g, '')
                this.setState({ phoneNumber })
              }
            }
            containerStyle={
              {
                minWidth: dimensions.PERCENT_50,
                width: dimensions.LENGTH_250
              }
            }
            value={this.state.phoneNumber}
          />
          <View
            style={
              {
                width: dimensions.LENGTH_50
              }
            }
          />
        </View>
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
              const countryCode = countryCodes[this.state.selection].code
              const sid = constructSid(countryCode, this.state.phoneNumber)

              if (this.state.phoneNumber.length < 1) {
                ToastAndroid.showWithGravity(
                  'Enter contact phone number.',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                )
                return
              }

              createContact(sid)
                .then(() => {
                  updateContactStatus(sid, 0)
                  this.props.goToContactEdit(sid)
                })
            }
          }
          rightActionIconName='clear'
          rightActionOnPress={
            () => {
              if (this.state.phoneNumber === '') {
                ToastAndroid.showWithGravity(
                  'Everything is cleared.',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                )
                return
              }

              this.setState({ phoneNumber: '' })
            }
          }
        />
      </View>
    )
  }
}
