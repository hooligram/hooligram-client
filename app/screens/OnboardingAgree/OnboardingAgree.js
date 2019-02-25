import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '@hooligram/constants'

export default class OnboardingAgree extends Component {
  static propTypes = {
    agreeAndContinue: PropTypes.func.isRequired
  }

  render() {
    const { agreeAndContinue } = this.props
    const linkedTextStyles = {
      ...styles.text,
      ...styles.link
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Welcome To Hooligram'}</Text>
        </View>
        <View style={styles.body}>
          <Image
            source={require('@resources/images/background.png')}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>
            {'Read our '}
            <Text style={linkedTextStyles}>{'Privacy Policy'}</Text>
            <Text style={styles.text}>{'. Tap "Agree and continue" to accept the'}</Text>
            <Text style={linkedTextStyles}>{' Terms of Service'}</Text>
          </Text>
          <Button
            backgroundColor={styles.button.backgroundColor}
            buttonStyle={styles.button}
            loading={false}
            onPress={agreeAndContinue}
            title={'AGREE AND CONTINUE'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: 250,
    height: 250
  },
  body: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 300,
    backgroundColor: Colors.lightGreen
  },
  container: {
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  footer: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  header: {
    minHeight: 50,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    color: Colors.textLink
  },
  text: {
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 20,
    color: Colors.boldGreen,
    fontWeight: 'bold'
  }
})
