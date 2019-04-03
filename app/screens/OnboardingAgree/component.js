import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { colors, dimensions, fontSizes } from 'hg/constants'

export default class OnboardingAgree extends Component {
  static propTypes = {
    goToOnboardingRequest: PropTypes.func.isRequired
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginVertical: dimensions.MARGIN_LARGE
          }}
        >
          <Text
            style={{
              color: colors.BOLD_GREEN,
              fontSize: fontSizes.MEDIUM,
              fontWeight: 'bold'
            }}
          >Welcome to Hooligram</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Image
            source={require('hg/resources/images/background.png')}
            style={{
              height: dimensions.LENGTH_250,
              width: dimensions.LENGTH_250
            }}
          />
        </View>
        <View
          style={{
            marginVertical: dimensions.MARGIN_LARGE
          }}
        >
          <Button
            backgroundColor={colors.LIGHT_GREEN}
            onPress={this.props.goToOnboardingRequest}
            title='Continue'
          />
        </View>
      </View>
    )
  }
}
