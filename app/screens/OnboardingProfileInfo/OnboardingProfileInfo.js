import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Colors } from '@hooligram/constants'

class OnboardingProfileInfo extends Component {
  static propTypes = {
    saveUserName: PropTypes.func.isRequired
  }

  state = {
    userName: ''
  }

  render() {
    const {
      saveUserName
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {'Profile info'}
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>
            {'Please provide your name'}
          </Text>
          <TextInput
            autoFocus={true}
            onChangeText={(text) => {
              this.setState({ userName: text })
            }}
            style={styles.textInputUserName}
            underlineColorAndroid={Colors.boldGreen}
            value={this.state.userName}/>
        </View>
        <Button
          buttonStyle={styles.button}
          backgroundColor={Colors.lightGreen}
          onPress={saveUserName(this.state.userName)}
          title={'I\'m ready!'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  header: {
    minHeight: 50,
    maxHeight: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.boldGreen
  },
  body: {
    flexGrow: 1
  },
  description: {
    alignSelf: 'center'
  },
  textInputUserName: {
    alignSelf: 'center',
    marginTop: 15,
    width: 300
  },
  button: {
    width: 300,
    marginBottom: 15
  }
})

export default OnboardingProfileInfo
