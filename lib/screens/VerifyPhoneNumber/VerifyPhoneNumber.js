import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button, StyleSheet, Picker, TextInput } from 'react-native'

class VerifyPhoneNumber extends Component {
  static propTypes = {
    texts: PropTypes.shape({
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      btnNext: PropTypes.string.isRequired
    }).isRequired,
    countryCodes: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    selectedCountryCode: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }),
    phoneNumber: PropTypes.string.isRequired,
    onPressNext: PropTypes.func.isRequired,
    onSelectCountryCode: PropTypes.func.isRequired
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
      phoneNumber,
      onPressNext,
      onSelectCountryCode
    } = this.props
    const {
      value: defaultCountryCodeValue,
      label: defaultCountryCodeLabel
    } = countryCodes[0]
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
              selectedValue={selectedCountryCodeValue}
              onValueChange={onSelectCountryCode}>
              {countryCodes.map(({ value, label }) => (
                <Picker.Item
                  label={label}
                  value={value}
                  key={`${value}:${label}`}
                />
              ))}
            </Picker>
            <TextInput
              style={styles.textInputCountryCode}
              value={selectedCountryCodeValue}
            />
            <TextInput
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
