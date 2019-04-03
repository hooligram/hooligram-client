import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { ActivityIndicator } from 'hg/components'
import { colors } from 'hg/constants'

export default class OnboardingInitialize extends Component {
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
            source={require('hg/resources/images/background.png')}
            />
          <ActivityIndicator />
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
    backgroundColor: colors.WHITE
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
    color: colors.BOLD_GREEN
  },
  subTitle: {
    alignSelf: 'center',
    fontSize: 14,
    color: colors.GREY
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
