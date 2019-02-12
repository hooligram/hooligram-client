import React, { Component } from 'react'
import Config from 'react-native-config'
import { View, Text } from 'react-native'

export default Conversation = () => {
  return (
    <View>
      <Text>hello, {Config.API_HOST}</Text>
    </View>
  )
}
