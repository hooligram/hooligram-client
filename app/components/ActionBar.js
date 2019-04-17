import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import { TouchIcon } from 'hg/components'
import { colors, dimensions } from 'hg/constants'

export default class extends Component {
  static propTypes = {
    leftActionIconName: PropTypes.string,
    leftActionOnPress: PropTypes.func,
    mainActionIconName: PropTypes.string.isRequired,
    mainActionOnPress: PropTypes.func.isRequired,
    rightActionIconName: PropTypes.string,
    rightActionOnPress: PropTypes.func,
    style: PropTypes.object
  }

  render() {
    return (
      <View
        style={
          {
            backgroundColor: colors.TRANSLUCENT_WHITE,
            borderRadius: dimensions.BORDER_RADIUS,
            bottom: 0,
            flexDirection: 'row',
            height: dimensions.LENGTH_50,
            justifyContent: 'center',
            left: 0,
            position: 'absolute',
            right: 0,
            ...this.props.style
          }
        }
      >
        {
          this.props.leftActionIconName &&
          <View
            style={
              {
                flex: 0.30
              }
            }
          >
            <TouchIcon
              name={this.props.leftActionIconName}
              onPress={this.props.leftActionOnPress}
            />
          </View>
        }
        <View
          style={
            {
              flex: 0.4
            }
          }
        >
          <TouchIcon
            name={this.props.mainActionIconName}
            onPress={this.props.mainActionOnPress}
          />
        </View>
        {
          this.props.rightActionIconName &&
          <View
            style={
              {
                flex: 0.30
              }
            }
          >
            <TouchIcon
              name={this.props.rightActionIconName}
              onPress={this.props.rightActionOnPress}
            />
          </View>
        }
      </View>
    )
  }
}
