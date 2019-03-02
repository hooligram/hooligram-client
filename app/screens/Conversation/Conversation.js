import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Colors } from '@hooligram/constants'

export default class Conversation extends Component {
  static propTypes = {
    code: PropTypes.string,
    country_code: PropTypes.string,
    isAuthorized: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape(
        {
          isCurrentUser: PropTypes.bool,
          message: PropTypes.string.isRequired,
          sender: PropTypes.string.isRequired
        }
      )
    ),
    phone_number: PropTypes.string
  }

  state = {
    text: ''
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

    const { height } = Dimensions.get('window')

    return (
      <ImageBackground
        source={require('@resources/images/conversation-background.jpg')}
        style={{
          flex: 1,
          height
        }}
      >
        <KeyboardAvoidingView
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              margin: 4
            }}
          >
            <FlatList
              data={messages}
              keyExtractor={(_, index) => `${index}`}
              onContentSizeChange={() => this.messages.scrollToEnd({ animated: true })}
              onLayout={() => this.messages.scrollToEnd({ animated: true })}
              ref={ref => this.messages = ref}
              renderItem={({ item }) => {
                const isMine = item.isCurrentUser

                const alignment = isMine ? 'flex-end' : 'flex-start'
                const cloudColor = isMine ? Colors.lighterGreen : Colors.white

                return (
                    <View
                      style={{
                        alignItems: alignment,
                        alignSelf: alignment,
                        backgroundColor: cloudColor,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        marginVertical: 2,
                        maxWidth: '90%',
                        padding: 4
                      }}
                    >
                      {!isMine && (
                        <Text
                          style={{
                            color: Colors.lightBlue,
                            fontSize: 18,
                          }}
                        >
                          {item.sender}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 18,
                        }}
                      >
                        {item.message}
                      </Text>
                    </View>
                )
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 4
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 25,
                flex: 1,
                marginRight: 4,
                paddingHorizontal: 8
              }}
            >
              <TextInput
                multiline={true}
                onChangeText={((text) => { this.setState({ text })})}
                style={{
                  fontSize: 18,
                  marginTop: 1
                }}
                value={this.state.text}
              />
            </View>
            <View
              style={{
                backgroundColor: Colors.boldGreen,
                borderRadius: 25,
                height: 50,
                justifyContent: 'center',
                width: 50
              }}
            >
              <Icon
                color={Colors.white}
                name={'send'}
                onPress={this._sendMessage}
                size={30}
                underlayColor='transparent'
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
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

  _sendMessage = () => {
    const { sendMessage } = this.props
    const { text } = this.state

    if (text) {
      sendMessage(text)
    }

    this.setState({ text: '' })
  }
}
