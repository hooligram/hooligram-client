import React, { Component } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from 'hg/constants'

export default class extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
      >
        <View
          style={
            {
              flex: 1,
              justifyContent: 'center'
            }
          }
        >
          <Icon
            color={colors.BOLD_GREEN}
            name={this.props.name}
            type='material'
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
