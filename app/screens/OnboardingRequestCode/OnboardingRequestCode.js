import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker, TextInput, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors, countryCodes } from '@hooligram/constants'

class OnboardingRequestCode extends Component {
  static propTypes = {
    onPressNext: PropTypes.func.isRequired
  }

  state = {
    phoneNumber: '',
    selection: 0
  }

  render() {
    const {
      onPressNext
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Verify your phone number'}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>{
            'Hooligram will send an SMS message to verify your phone number. ' +
            'Enter your country code and phone number:'
          }</Text>
          <View style={styles.form}>
            <Picker
              onValueChange={(_, index) => {
                this.setState({ selection: index });
              }}
              selectedValue={this.state.selection}
              style={styles.pickerCountryCode}>
              {countryCodes.map(({ name }, key) => (
                <Picker.Item
                  label={name}
                  key={key}
                  value={key}
                />
              ))}
            </Picker>
            <TextInput
              editable={false}
              keyboardType={'numeric'}
              style={styles.textInputCountryCode}
              underlineColorAndroid={Colors.boldGreen}
              value={`+${countryCodes[this.state.selection].code}`}
            />
            <TextInput
              autoFocus={true}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({ phoneNumber: text })
              }}
              style={styles.textInputPhoneNumber}
              underlineColorAndroid={Colors.boldGreen}
              value={this.state.phoneNumber}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            backgroundColor={styles.button.backgroundColor}
            buttonStyle={styles.button}
            fontSize={14}
            onPress={onPressNext(
              countryCodes[this.state.selection].code,
              this.state.phoneNumber,
              Keyboard
            )}
            raised
            title={'REQUEST CODE'}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.white
  },
  header: {
    minHeight: 50,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: Colors.boldGreen,
    fontWeight: 'bold'
  },
  body: {
    flexGrow: 1,
    alignItems: 'center',
  },
  description: {
    marginTop: 15,
    marginHorizontal: 15,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black,
    textAlign: 'center',
    width: '100%'
  },
  footer: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
  },
  form: {
    paddingLeft: 80,
    paddingRight: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  pickerCountryCode: {
    width: '100%'
  },
  textInputCountryCode: {
    width: '20%'
  },
  textInputPhoneNumber: {
    width: '80%'
  },
  button: {
    width: 140,
    height: 38,
    backgroundColor: Colors.lightGreen
  }
})

export default OnboardingRequestCode
