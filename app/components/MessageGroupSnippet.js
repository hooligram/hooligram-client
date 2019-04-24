import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, dimensions } from 'hg/constants'
import Circle from './Circle'

export default class extends Component {
  static propTypes = {
    messageGroup: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      numOfParticipants: PropTypes.number.isRequired
    }),
    onPress: PropTypes.func.isRequired
  }

  render() {
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
            <Icon
              color={colors.GREY}
              name='group'
              type='material'
            />
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
              {this.props.messageGroup.name}
            </Text>
            <Text>{`${this.props.messageGroup.numOfParticipants} participants`}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
