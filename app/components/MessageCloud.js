import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { colors, dimensions, fontSizes } from 'hg/constants'
import { readContact } from 'hg/db'

export default class extends Component {
  static propTypes = {
    currentUserSid: PropTypes.string.isRequired,
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      date_created: PropTypes.string.isRequired,
      message_group_id: PropTypes.number.isRequired,
      sender_sid: PropTypes.string.isRequired
    }),
    shouldShowName: PropTypes.bool
  }

  state = {
    senderName: ''
  }

  render() {
    const isOwnMessage = this.props.currentUserSid === this.props.message.sender_sid
    return (
      <View>
        <View
          style={
            {
              alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
              backgroundColor: colors.TEA_GREEN,
              borderRadius: dimensions.BORDER_RADIUS,
              maxWidth: '80%',
              padding: dimensions.PADDING
            }
          }
        >
          {
            this.props.shouldShowName &&
            <Text>{this.state.senderName}</Text>
          }
          <Text
            style={
              {
                color: colors.BLACK,
                fontSize: fontSizes.MEDIUM
              }
            }
          >
            {this.props.message.content}
          </Text>
          <Text
            style={
              {
                textAlign: 'right'
              }
            }
          >
            {moment(this.props.message.date_created).format('YYYY-MM-DD h:mm A')}
          </Text>
        </View>
      </View>
    )
  }

  componentDidMount() {
    const senderSid = this.props.message.sender_sid
    readContact(senderSid)
      .then((contact) => {
        this.setState({ senderName: contact.name })
      })
  }
}
