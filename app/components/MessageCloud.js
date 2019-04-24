import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { colors, dimensions, fontSizes } from 'hg/constants'

export default class extends Component {
  static propTypes = {
    isOwnMessage: PropTypes.bool,
    message: PropTypes.shape({
      content: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired
    }),
    senderName: PropTypes.string
  }

  render() {
    return (
      <View>
        <View
          style={
            {
              alignSelf: this.props.isOwnMessage ? 'flex-end' : 'flex-start',
              backgroundColor: colors.TEA_GREEN,
              borderRadius: dimensions.BORDER_RADIUS,
              maxWidth: '80%',
              padding: dimensions.PADDING
            }
          }
        >
          {
            !this.props.isOwnMessage
            ?
            (
              this.props.senderName &&
              <Text>{this.props.senderName}</Text>
            )
            :
            null
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
            {moment(this.props.message.dateCreated).format('YYYY-MM-DD h:mm A')}
          </Text>
        </View>
      </View>
    )
  }
}
