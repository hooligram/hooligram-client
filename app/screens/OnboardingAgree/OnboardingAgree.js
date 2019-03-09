import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { colors } from 'hg/constants'

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
            source={require('hg/resources/images/background.png')}
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
    height: 250,
    width: 250
  },
  body: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: colors.LIGHT_GREEN,
    width: 300
  },
  container: {
    flex: 1
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    paddingBottom: 15
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
    minHeight: 50
  },
  link: {
    color: colors.TEXT_LINK
  },
  text: {
    marginVertical: 15,
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  title: {
    color: colors.BOLD_GREEN,
    fontSize: 20,
    fontWeight: 'bold'
  }
})
