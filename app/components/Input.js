import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Input } from 'react-native-elements'
import { colors, dimensions } from 'hg/constants'

export default class extends PureComponent {
  static propTypes = {
    containerStyle: PropTypes.object,
    inputContainerStyle: PropTypes.object,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    reference: PropTypes.func,
    value: PropTypes.string.isRequired
  }

  render() {
    return (
      <Input
        containerStyle={
          {
            backgroundColor: colors.TRANSLUCENT_WHITE,
            borderColor: colors.WHITE_SMOKE,
            borderRadius: dimensions.BORDER_RADIUS,
            borderWidth: dimensions.BORDER_WIDTH,
            marginBottom: dimensions.LENGTH_50,
            paddingHorizontal: dimensions.PADDING,
            ...this.props.containerStyle
          }
        }
        inputContainerStyle={
          {
            borderBottomWidth: 0,
            padding: 0,
            ...this.props.inputContainerStyle
          }
        }
        multiline={true}
        onBlur={this.props.onBlur || (() => {})}
        onChangeText={this.props.onChangeText}
        onFocus={this.props.onFocus || (() => {})}
        ref={this.props.reference || (() => {})}
        value={this.props.value}
      />
    )
  }
}
