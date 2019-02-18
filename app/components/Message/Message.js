import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { Colors } from '@constants'

class Message extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    right: PropTypes.bool,
    sender: PropTypes.string
  }

  render() {
    const {
      sender,
      message,
      right
    } = this.props
    
    const containerStyle = {
      ...styles.container,
      alignSelf: right ? 'flex-end' : 'flex-start',
      backgroundColor: right ? Colors.lighterGreen : Colors.white
    }

    return (
      <View style={containerStyle}>
        {sender && !right && (
        <Text style={styles.sender}>
          {sender}
        </Text>)}
        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    borderRadius: 5,
    width: '85%',
    padding: 10,
    marginBottom: 15
  },
  sender: {
    fontWeight: 'bold',
    color:  Colors.lightBlue
  },
  message: {
    color: Colors.black,
  }
})

export default Message
