import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import { colors } from 'hg/constants'
import { formatPhoneNumber } from 'hg/utils'

class OnboardingSubmitCode extends Component {
  static propTypes = {
    countryCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    resendVerificationCode: PropTypes.func.isRequired,
    submitVerificationCode: PropTypes.func.isRequired
  }

  state = {
    verificationCode: ''
  }

  render() {
    const {
      countryCode,
      phoneNumber,
      resendVerificationCode,
      submitVerificationCode
    } = this.props

    const linkedTextStyle = {
      ...styles.text,
      ...styles.link
    }

    const formattedPhoneNumber = formatPhoneNumber(countryCode, phoneNumber);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{
            `Verify ${formattedPhoneNumber}`
          }</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>
            {`We have sent an SMS with a code to ${formattedPhoneNumber}.`}
            <Text style={linkedTextStyle}>{
              ' Wrong number?'
            }</Text>
          </Text>
          <TextInput
            keyboardType={'numeric'}
            onChangeText={(text) => {
              this.setState({ verificationCode: text })
            }}
            placeholder={'- - - -'}
            style={styles.textInputVerificationCode}
            underlineColorAndroid={colors.BOLD_GREEN}
            value={this.state.verificationCode}
          />
          <Text style={styles.textInputHelper}>
            {'Enter 4-digit code'}
          </Text>
          <Button
            backgroundColor={colors.LIGHT_GREEN}
            buttonStyle={styles.button}
            onPress={submitVerificationCode(this.state.verificationCode)}
            title={'SUBMIT CODE'}
          />
          <Divider style={styles.divider}/>
          <Button
            backgroundColor={colors.WHITE}
            buttonStyle={styles.resendButton}
            color={colors.GREY}
            icon={{
              color: colors.GREY,
              name: 'textsms',
              size: 15,
              type: 'material'
            }}
            onPress={resendVerificationCode(countryCode, phoneNumber)}
            title={'Resend SMS'}
            titleStyle={styles.resendButtonTitle}
            type={'clear'}
          />
        </View>
        <View style={styles.footer}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.WHITE
  },
  header: {
    minHeight: 50,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: colors.BOLD_GREEN,
    fontWeight: 'bold'
  },
  text: {
    color: colors.BLACK,
    lineHeight: 24,
    marginVertical: 15,
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  link: {
    color: colors.TEXT_LINK
  },
  textInputVerificationCode: {
    width: 120,
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'center'
  },
  textInputHelper: {
    alignSelf: 'center'
  },
  divider: {
    marginTop: 15,
    marginHorizontal: 30
  },
  button: {
    alignSelf: 'center',
    height: 38,
    marginTop: 15,
  },
  buttonTitle: {},
  resendButton: {
    height: 38,
    marginHorizontal: 15,
    marginTop: 15,
    justifyContent: 'flex-start'
  },
  resendButtonTitle: {
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  }
})

export default OnboardingSubmitCode
