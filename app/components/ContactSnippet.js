import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, dimensions, fontSizes } from 'hg/constants'
import { getFlagEmoji } from 'hg/utils'
import Circle from './Circle'

export default class extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      name: PropTypes.string,
      sid: PropTypes.string.isRequired
    }),
    isSelected: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }

  render() {
    const phoneNumber = this.props.contact.sid.split('.')[1]
    const name = this.props.contact.name ? this.props.contact.name : phoneNumber
    const flagEmoji = getFlagEmoji(this.props.contact.sid)

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
          </Circle>
          <View
            style={
              {
                flex: 1,
                paddingHorizontal: dimensions.PADDING
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
              {name}
            </Text>
            <Text>{this.props.contact.sid}</Text>
          </View>
          {
            this.props.isSelected &&
              <Icon
                iconStyle={
                  {
                    color: colors.TEAL
                  }
                }
                name='done'
                type='material'
              />
          }
        </View>
      </TouchableNativeFeedback>
    )
  }
}
