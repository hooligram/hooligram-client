import React, { Component } from 'react'
import { Picker, ToastAndroid, View } from 'react-native'
import { Icon, Input, Text } from 'react-native-elements'
import { colors, countryCodes, dimensions, fontSizes } from 'hg/constants'
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
            name='done'
            onPress={
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
                    this.props.goToContactEdit(sid)
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
            raised
            type='material'
          />
        </View>
      </View>
    )
  }
}
