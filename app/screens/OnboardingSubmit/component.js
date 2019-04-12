import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { OnboardingHeader } from 'hg/components'
import { app, colors, dimensions, fontSizes } from 'hg/constants'
import { formatPhoneNumber } from 'hg/utils'

export default class OnboardingSubmit extends Component {
  static propTypes = {
    countryCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    requestVerificationCode: PropTypes.func.isRequired,
    submitVerificationCode: PropTypes.func.isRequired
  }

  state = {
    isRequesting: false,
    isSubmitting: false,
    verificationCode: ''
  }

  render() {
    const formattedPhoneNumber = formatPhoneNumber(this.props.countryCode, this.props.phoneNumber)

    return (
      <View
        style={
          {
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: dimensions.PADDING
          }
        }
      >
        <OnboardingHeader
          title={`Verify ${formattedPhoneNumber}`}
        />
        <Text>{`We have sent an SMS with a code to ${formattedPhoneNumber}.`}</Text>
        <Input
          containerStyle={
            {
              width: dimensions.LENGTH_200
            }
          }
          inputStyle={
            {
              fontSize: fontSizes.XXLARGE,
              textAlign: 'center'
            }
          }
          keyboardType={'numeric'}
          onChangeText={
            (text) => {
              this.setState({ verificationCode: text })
            }
          }
          value={this.state.verificationCode}
        />
        <Text>Enter 4-digit code</Text>
        <Button
          buttonStyle={
            {
              width: dimensions.LENGTH_150
            }
          }
          containerStyle={
            {
              marginTop: dimensions.PADDING
            }
          }
          loading={this.state.isRequesting}
          loadingProps={
            {
              color: colors.GREY
            }
          }
          onPress={
            () => {
              if (this.state.isRequesting) return

              this.setState({ isRequesting: true })
              this.props.requestVerificationCode(this.props.countryCode, this.props.phoneNumber)

              setTimeout(
                () => {
                  this.setState({ isRequesting: false })
                },
                app.LONG_TIMEOUT
              )
            }
          }
          title='Resend SMS'
          titleStyle={
            {
              color: colors.GREY
            }
          }
          type='clear'
        />
        <View
          style={
            {
              alignSelf: 'stretch',
              flex: 1,
              justifyContent: 'flex-end'
            }
          }
        >
          <Button
            loading={this.state.isSubmitting}
            loadingProps={
              {
                color: colors.BOLD_GREEN
              }
            }
            onPress={
              () => {
                if (this.state.isSubmitting) return

                this.setState({ isSubmitting: true })
                this.props.submitVerificationCode(this.state.verificationCode)

                setTimeout(
                  () => {
                    this.setState({ isSubmitting: false })
                  },
                  app.LONG_TIMEOUT
                )
              }
            }
            title='Submit code'
            titleStyle={
              {
                color: colors.BOLD_GREEN
              }
            }
            type='clear'
          />
        </View>
      </View>
    )
  }
}
