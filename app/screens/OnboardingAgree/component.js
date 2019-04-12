import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import { OnboardingHeader } from 'hg/components'
import { colors, dimensions } from 'hg/constants'

export default class OnboardingAgree extends Component {
  static propTypes = {
    goToOnboardingRequest: PropTypes.func.isRequired
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
        <View
          style={
            {
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center'
            }
          }
        >
          <Image
            source={require('hg/resources/images/hooligram-blue.png')}
            style={
              {
                height: dimensions.LENGTH_100,
                width: dimensions.LENGTH_100
              }
            }
          />
          <OnboardingHeader
            title='Welcome to Hooligram'
          />
        </View>
        <Button
          buttonStyle={
            {
              backgroundColor: colors.BOLD_GREEN,
              borderRadius: 0
            }
          }
          onPress={this.props.goToOnboardingRequest}
          raised
          title='Continue'
        />
        </View>
    )
  }
}
