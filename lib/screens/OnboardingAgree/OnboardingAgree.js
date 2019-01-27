import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'

export default class OnboardingAgree extends Component {
  static propTypes = {
    goToNextScreen: PropTypes.func.isRequired
  }

  render() {
    const linkedTextStyles = { 
      ...styles.text,
      ...styles.link
    }
    const { 
      goToNextScreen,
      isLoading
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{'Welcome To Hooligram'}</Text>
        </View>
        <View style={styles.body}>
          <Image 
            style={styles.backgroundImage}
            source={require('@resources/images/background.png')}
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
            loading={isLoading}
            buttonStyle={styles.button}
            backgroundColor={styles.button.backgroundColor}
            colorUnderlineAndroid={'#128c7e'}
            title={'AGREE AND CONTINUE'}
            onPress={goToNextScreen}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  header: {
    minHeight: 50,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    color: '#128c7e',
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 15
  },
  backgroundImage: {
    width: 250,
    height: 250
  },
  link: {
    color: '#3366BB'
  },
  button: {
    width: 300,
    backgroundColor: '#25D366'
  }
})