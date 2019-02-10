import React, { Component } from 'react'
import {
  ActivityIndicator, 
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Colors } from '@constants'

class OnboardingInitialize extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyTop}>
            <Text style={styles.title}>
              {'Initializing...'}
            </Text>
            <Text style={styles.subTitle}>
              {'Please wait a moment'}
            </Text>
          </View>
          <Image 
            style={styles.backgroundImage}
            source={require('@resources/images/background.png')}
            />
          <ActivityIndicator
            color={Colors.boldGreen}
            size={45}/>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.props.onComponentDidMount()
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.white
  },
  header: {
    minHeight: 50
  },
  body: {
    marginHorizontal: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },  
  bodyTop: {},
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    color: Colors.boldGreen
  },
  subTitle: {
    alignSelf: 'center',
    fontSize: 14,
    color: Colors.grey
  },
  backgroundImage: {
    width: 250,
    height: 250
  },
  footer: {
    minHeight: 80,
    justifyContent: 'center'
  }
})

export default OnboardingInitialize
