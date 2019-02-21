import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native'
import { MessageWriter, Message } from '@hooligram/components'

export default class Conversation extends Component {
  static propTypes = {
    code: PropTypes.string,
    country_code: PropTypes.string,
    phone_number: PropTypes.string,
    isAuthorized: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape(
        {
          message: PropTypes.string.isRequired,
          sender: PropTypes.string.isRequired,
          isCurrentUser: PropTypes.bool
        }
      )
    )
  }

  render() {
    const {
      isAuthorized,
      messages
    } = this.props

    if (!isAuthorized) {
      return (
        <View>
          <Text>{
            'Signing you in ...'
          }</Text>
        </View>
      )
    }

    return (
      <React.Fragment>
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={-180}
          style={styles.container}>
          <View style={styles.messages}>
            <FlatList
              data={messages}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({ item }) => (
                <Message
                  message={item.message}
                  sender={item.sender}
                  right={item.isCurrentUser}/>
              )}
              style={styles.flatList}/>
          </View>
          <View style={styles.messageWriter}>
            <MessageWriter/>
          </View>
        </KeyboardAvoidingView>
        <ImageBackground 
          source={require('@resources/images/conversation-background.jpg')}
          style={styles.background}/>
      </React.Fragment>
    )
  }

  componentDidMount() {
    const {
      code,
      country_code,
      phone_number
    } = this.props

    this.props.signIn(code, country_code, phone_number)
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  background: {
    top: 0,
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  messages: {
    flexGrow: 1,
    padding: 10
  },
  flatList: {
    flexGrow: 0.9,
  },
  messageWriter: {
    position: 'absolute',
    bottom: 0,
    minHeight: 50,
    width: '100%'
  }
})
