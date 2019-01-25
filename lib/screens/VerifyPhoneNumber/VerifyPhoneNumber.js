import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Picker, StyleSheet, Text, TextInput, View } from 'react-native'

class VerifyPhoneNumber extends Component {
  static propTypes = {
    countryCodes: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    onPressNext: PropTypes.func.isRequired,
    onSelectCountryCode: PropTypes.func.isRequired,
    selectedCountryCode: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    texts: PropTypes.shape({
      btnNext: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    phoneNumber: ''
  }

  render() {
    const {
      texts: {
        description,
        title,
        btnNext
      },
      countryCodes,
      selectedCountryCode,
      onPressNext,
      onSelectCountryCode
    } = this.props
    const phoneNumber = this.state.phoneNumber
    const {
      value: selectedCountryCodeValue,
      label: selectedCountryCodeLabel
    } = selectedCountryCode

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>
            {title}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>
            {description}
          </Text>
          <View
            style={styles.form}>
            <Picker
              style={styles.pickerCountryCode}
              selectedValue={selectedCountryCodeLabel}
              onValueChange={onSelectCountryCode}>
              {countryCodes.map(({ label }) => (
                <Picker.Item
                  label={label}
                  value={label}
                  key={label}
                />
              ))}
            </Picker>
            <TextInput
              style={styles.textInputCountryCode}
              value={selectedCountryCodeValue}
            />
            <TextInput
              keyboardType='number-pad'
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              style={styles.textInputPhoneNumber}
              value={phoneNumber}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            color={styles.btnNext.color}
            title={btnNext}
            onPress={onPressNext}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  header: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  description: {
    width: '100%'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: 80
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
  btnNext: {
    color: '#25D366'
  }
})

export default VerifyPhoneNumber
