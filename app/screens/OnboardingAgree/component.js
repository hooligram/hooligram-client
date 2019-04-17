import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { ActionBar, OnboardingHeader } from 'hg/components'
import { colors, dimensions } from 'hg/constants'

export default class extends Component {
  static propTypes = {
    goToOnboardingRequest: PropTypes.func.isRequired
  }

  state = {}

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
        <ActionBar
          mainActionIconName='check'
          mainActionOnPress={
            () => {
              this.props.goToOnboardingRequest()
            }
          }
          style={
            {
              backgroundColor: colors.WHITE
            }
          }
        />
      </View>
    )
  }
}
