import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors } from '@constants'

class MessageWriter extends Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired
  }

  state = {
    text: '',
    keyboardType: 'default'
  }

  render() {
    const { text } = this.state
    const isActive = text != ''
    const textButtonStyle = {
      ...styles.textButton,
      backgroundColor: isActive ? Colors.boldGreen : Colors.grey
    }
    const { sendMessage } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.writer}>
          <View style={styles.smiley}>
            <Icon
              color={Colors.grey}
              name={'sentiment-very-satisfied'}
              size={30}/>
          </View>
          <TextInput
            onChangeText={text => this.setState({ text })}
            multiline={true}
            placeholder={'Type your message'}
            style={styles.textInput}
            value={text}/>
        </View>
        <View style={textButtonStyle}>
          <Icon
            color={Colors.white}
            name={'send'}
            onPress={sendMessage(text)}
            size={25}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    flexDirection: 'row',
    padding: 10,
  },
  writer: {
    borderRadius: 50,
    backgroundColor: Colors.white,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  smiley: {
    height: 30,
    justifyContent: 'center',
    margin: 10,
    width: 30,
  },
  textInput: {
    flexGrow: 1,
    maxWidth: '100%'
  },
  textButton: {
    backgroundColor: Colors.boldGreen,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 5,
    width: 50
  }
})

export default MessageWriter
