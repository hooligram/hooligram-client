import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import { OnboardingHeader } from 'hg/components'
import { app, colors, dimensions } from 'hg/constants'

export default class OnboardingAgree extends Component {
  static propTypes = {
    goToOnboardingRequest: PropTypes.func.isRequired
  }

  state = {
    isLoading: false
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
          loading={this.state.isLoading}
          loadingProps={
            {
              color: colors.BOLD_GREEN
            }
          }
          onPress={
            () => {
              this.setState({ isLoading: true })

              setTimeout(() => {
                this.props.goToOnboardingRequest()
              }, app.LOADING_TIMEOUT)
            }
          }
          title='Continue'
          titleStyle={
            {
              color: colors.BOLD_GREEN
            }
          }
          type='clear'
        />
      </View>
    )
  }
}
