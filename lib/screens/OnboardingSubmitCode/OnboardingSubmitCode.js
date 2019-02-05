import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import { Colors } from '@constants'

class OnboardingSubmitCode extends Component {
  static propTypes = {
    isResendLoading: PropTypes.bool.isRequired,
    isSubmitDisabled: PropTypes.bool.isRequired,
    isSubmitLoading: PropTypes.bool.isRequired,
    onChangeCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    verificationCode: PropTypes.string.isRequired
  }

  render() {
    const {
      isResendLoading,
      isSubmitDisabled,
      isSubmitLoading,
      onChangeCode,
      phoneNumber,
      resendSMS,
      submitCode,
      verificationCode
    } = this.props

    const linkedTextStyle = {
      ...styles.text,
      ...styles.link
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{
            `Verify ${phoneNumber}`
          }</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.text}>
            {`We have sent an SMS with a code to ${phoneNumber}.`}
            <Text style={linkedTextStyle}>{
              ' Wrong number?'
            }</Text>
          </Text>
          <TextInput
            keyboardType={'numeric'}
            onChangeText={onChangeCode}
            placeholder={'- - - - - -'}
            style={styles.textInputVerificationCode}
            underlineColorAndroid={Colors.boldGreen}
            value={verificationCode}
          />
          <Text style={styles.textInputHelper}>
            {'Enter 6-digit code'}
          </Text>
          <Button 
            backgroundColor={Colors.lightGreen}
            buttonStyle={styles.button}
            disabled={isSubmitDisabled}
            loading={isSubmitLoading}
            onPress={submitCode(verificationCode)}
            title={'SUBMIT CODE'}
          />
          <Divider style={styles.divider}/>
          <Button
            backgroundColor={Colors.white}
            buttonStyle={styles.resendButton}
            color={Colors.grey}
            icon={{
              color: Colors.grey,
              name: isResendLoading ? '' : 'textsms',
              size: 15,
              type: 'material'
            }}
            loading={isResendLoading}
            onPress={resendSMS}
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
  text: {
    color: Colors.black,
    lineHeight: 24,
    marginVertical: 15,
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  link: {
    color: Colors.textLink
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
