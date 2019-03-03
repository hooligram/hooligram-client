import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { ActivityIndicator } from 'hg/components'

class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})

export default Splash
