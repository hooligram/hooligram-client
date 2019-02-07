import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Picker, TextInput, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'

class OnboardingRequestCode extends Component {
  static propTypes = {
    countryCodes: PropTypes.arrayOf(PropTypes.shape(
      {
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }
    )).isRequired,
    isLoading: PropTypes.bool.isRequired,
    selectedCountryCode: PropTypes.string.isRequired,
    selectedCountryName: PropTypes.string.isRequired,
    onPressNext: PropTypes.func.isRequired,
    onSelectCountryCode: PropTypes.func.isRequired,
    onChangeCountryCode: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }

  render() {
    const {
      countryCodes,
      isLoading,
      onChangePhoneNumber,
      onChangeCountryCode,
      onPressNext,
      onSelectCountryCode,
      selectedCountryCode,
      selectedCountryName,
      phoneNumber
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
              onValueChange={onSelectCountryCode(countryCodes)}
              selectedValue={selectedCountryName}
              style={styles.pickerCountryCode}>
              {countryCodes.map(({ name }, key) => (
                <Picker.Item
                  label={name}
                  key={`${key}:${name}`}
                  value={name}
                />
              ))}
            </Picker>
            <TextInput
              editable={false}
              keyboardType={'numeric'}
              onChangeText={onChangeCountryCode}
              style={styles.textInputCountryCode}
              underlineColorAndroid={'#128c7e'}
              value={`+${selectedCountryCode}`}
            />
            <TextInput
              autoFocus={true}
              keyboardType={'numeric'}
              onChangeText={onChangePhoneNumber}
              style={styles.textInputPhoneNumber}
              underlineColorAndroid={'#128c7e'}
              value={phoneNumber}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button 
            backgroundColor={styles.button.backgroundColor}
            buttonStyle={styles.button}
            fontSize={14}
            loading={isLoading}
            onPress={onPressNext(selectedCountryCode, phoneNumber, Keyboard)}
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
    backgroundColor: 'white'
  },
  header: {
    minHeight: 50,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: '#128c7e',
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
    color: 'black',
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
    backgroundColor: '#25D366'
  }
})

export default OnboardingRequestCode
