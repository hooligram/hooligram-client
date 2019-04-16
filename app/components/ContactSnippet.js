import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors, dimensions } from 'hg/constants'

export default class ContactSnippet extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      sid: PropTypes.string.isRequired
    }),
    isSelected: PropTypes.bool,
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
          <Icon
            containerStyle={
              {
                alignItems: 'center',
                backgroundColor: colors.WHITE,
                borderRadius: dimensions.ICON_BORDER_RADIUS,
                elevation: dimensions.ELEVATION,
                height: dimensions.ICON_SIZE,
                justifyContent: 'center',
                width: dimensions.ICON_SIZE
              }
            }
            iconStyle={
              {
                color: colors.GREY
              }
            }
            name='person'
            type='material'
          />
          <View
            style={
              {
                flex: 1,
                paddingHorizontal: dimensions.PADDING
              }
            }
          >
            <Text>{this.props.contact.sid}</Text>
          </View>
          {
            this.props.isSelected &&
              <Icon
                iconStyle={
                  {
                    color: colors.BOLD_GREEN
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
