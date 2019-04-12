import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from 'hg/constants'

export default class ActionBar extends Component {
  static propTypes = {
    leftActionIconName: PropTypes.string.isRequired,
    leftActionOnPress: PropTypes.func.isRequired,
    mainActionIconName: PropTypes.string.isRequired,
    mainActionOnPress: PropTypes.func.isRequired,
    rightActionIconName: PropTypes.string.isRequired,
    rightActionOnPress: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  render() {
    return (
      <View
        style={
          {
            flexDirection: 'row',
            justifyContent: 'center',
            ...this.props.style
          }
        }
      >
        <Icon
          color={colors.BOLD_GREEN}
          name={this.props.leftActionIconName}
          onPress={this.props.leftActionOnPress}
          raised
          type='material'
        />
        <Icon
          color={colors.BOLD_GREEN}
          name={this.props.mainActionIconName}
          onPress={this.props.mainActionOnPress}
          raised
          reverse
          type='material'
        />
        <Icon
          color={colors.BOLD_GREEN}
          name={this.props.rightActionIconName}
          onPress={this.props.rightActionOnPress}
          raised
          type='material'
        />
      </View>
    )
  }
}
