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
import { colors, dimensions, fontSizes } from 'hg/constants'

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
        source={require('hg/resources/images/conversation-background.jpg')}
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
              margin: dimensions.MARGIN_SMALL
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
                const cloudColor = isMine ? colors.LIGHTER_GREEN : colors.WHITE

                return (
                    <View
                      style={{
                        alignItems: alignment,
                        alignSelf: alignment,
                        backgroundColor: cloudColor,
                        borderRadius: dimensions.BORDER_RADIUS,
                        marginHorizontal: dimensions.MARGIN,
                        marginVertical: dimensions.MARGIN_XSMALL,
                        maxWidth: '90%',
                        padding: dimensions.PADDING_SMALL
                      }}
                    >
                      {!isMine && (
                        <Text
                          style={{
                            color: colors.LIGHT_BLUE,
                            fontSize: fontSizes.MEDIUM,
                          }}
                        >
                          {item.sender}
                        </Text>
                      )}
                      <Text
                        style={{
                          color: colors.BLACK,
                          fontSize: fontSizes.MEDIUM,
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
              margin: dimensions.MARGIN_SMALL
            }}
          >
            <View
              style={{
                backgroundColor: colors.WHITE,
                borderRadius: dimensions.BUTTON_ICON_LENGTH / 2,
                flex: 1,
                marginRight: dimensions.MARGIN_SMALL,
                paddingHorizontal: dimensions.PADDING
              }}
            >
              <TextInput
                multiline={true}
                onChangeText={((text) => { this.setState({ text })})}
                style={{
                  fontSize: fontSizes.MEDIUM,
                  marginTop: -1
                }}
                value={this.state.text}
              />
            </View>
            <View
              style={{
                backgroundColor: colors.BOLD_GREEN,
                borderRadius: dimensions.BUTTON_ICON_LENGTH / 2,
                height: dimensions.BUTTON_ICON_LENGTH,
                justifyContent: 'center',
                width: dimensions.BUTTON_ICON_LENGTH
              }}
            >
              <Icon
                color={colors.WHITE}
                name={'send'}
                onPress={this._sendMessage}
                size={dimensions.ICON_SIZE}
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

    this.props.signIn(country_code, phone_number, code)
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
