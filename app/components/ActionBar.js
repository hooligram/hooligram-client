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
        <View
          style={
            {
              flex: 0.30
            }
          }
        >
          {
            this.props.leftActionIconName
            &&
            <TouchIcon
              name={this.props.leftActionIconName || 'not-interested'}
              onPress={this.props.leftActionOnPress}
            />
          }
        </View>
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
        <View
          style={
            {
              flex: 0.30
            }
          }
        >
          {
            this.props.rightActionIconName
            &&
            <TouchIcon
              name={this.props.rightActionIconName || 'not-interested'}
              onPress={this.props.rightActionOnPress}
            />
          }
        </View>
      </View>
    )
  }
}
