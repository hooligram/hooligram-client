import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Button, Text } from 'react-native'

export default class OnboardingAgree extends Component {
  static propTypes = {
    goToNextScreen: PropTypes.func.isRequired
  }

  render() {
    const linkedTextStyles = { 
      ...styles.text,
      ...styles.link
    }
    const { goToNextScreen } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome To Hooligram</Text>
        <Text style={styles.text}>Read our </Text>
        <Text style={linkedTextStyles}>Privacy Policy</Text>
        <Text style={styles.text}>. Tap "Agree and continue" to accept the</Text>
        <Text style={linkedTextStyles}>Terms of Service</Text>
        <Button 
          color={'#25D366'}
          title={'agree and continue'}
          onPress={goToNextScreen}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  title: {},
  text: {},
  link: {},
  button: {
    width: 50
  }
})
