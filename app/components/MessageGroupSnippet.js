import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, dimensions, fontSizes } from 'hg/constants'
import {
  readContact,
  readDirectMessageGroupRecipientSid,
  readIsDirectMessage,
  readMessageGroupContacts
} from 'hg/db'
import { getFlagEmoji } from 'hg/utils'
import Circle from './Circle'

export default class extends Component {
  static propTypes = {
    messageGroup: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    onPress: PropTypes.func.isRequired,
    userSid: PropTypes.string.isRequired
  }

  state = {
    isDirectMessage: false,
    contactSids: [],
    directMessageRecipient: '',
    directMessageSid: ''
  }

  render() {
    const groupName = this.props.messageGroup.name
    const directMessageRecipient = this.state.directMessageRecipient
    const isDirectMessage = this.state.isDirectMessage
    const title = isDirectMessage ? directMessageRecipient : groupName
    const flagEmoji = isDirectMessage ? getFlagEmoji(this.state.directMessageRecipient) : ''

    return (
      <TouchableNativeFeedback
        onPress={this.props.onPress}
      >
        <View
          style={
            {
              alignItems: 'center',
              flexDirection: 'row',
              padding: dimensions.PADDING
            }
          }
        >
          <Circle>
            {
              isDirectMessage ?
              <Text
                style={
                  {
                    color: colors.BLACK,
                    fontSize: fontSizes.LARGE
                  }
                }
              >
                {flagEmoji}
              </Text>
              :
              <Icon
                color={colors.GREY}
                name='group'
                type='material'
              />
            }
          </Circle>
          <View
            style={
              {
                paddingLeft: dimensions.PADDING
              }
            }
          >
            <Text
              style={
                {
                  color: colors.BLACK
                }
              }
            >
              {title}
            </Text>
            {
              !this.state.isDirectMessage &&
              <Text>{`${this.state.contactSids.length} participants`}</Text>
            }
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  componentDidMount() {
    readIsDirectMessage(this.props.messageGroup.id)
      .then((isDirectMessage) => {
        this.setState({ isDirectMessage })
        if (isDirectMessage) {
          return readDirectMessageGroupRecipientSid(this.props.messageGroup.id)
        }
        else {
          return
        }
      })
      .then((recipientSid) => {
        console.log('recipientSid', recipientSid)
        if (!recipientSid) return

        return readContact(recipientSid)
      })
      .then((contact) => {
        console.log('contact', contact)
        this.setState({ directMessageRecipient: contact.name ? contact.name : contact.sid })
        this.setState({ directMessageSid: contact ? contact.sid : '' })
      })

    readMessageGroupContacts(this.props.messageGroup.id)
      .then((contactSids) => {
        this.setState({ contactSids })
      })
  }
}
