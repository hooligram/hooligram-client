import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'

export default class extends Component {
  render() {
    return (
      <View
        style={
          {
            flex: 1,
            ...this.props.style
          }
        }
      >
        <NavigationEvents
          onDidBlur={
            (payload) => {
              if (!this.props.onDidBlur) return
              this.props.onDidBlur(payload)
            }
          }
          onDidFocus={
            (payload) => {
              if (!this.props.onDidFocus) return
              this.props.onDidFocus(payload)
            }
          }
          onWillBlur={
            (payload) => {
              if (!this.props.onWillBlur) return
              this.props.onWillBlur(payload)
            }
          }
          onWillFocus={
            (payload) => {
              if (!this.props.onWillFocus) return
              this.props.onWillFocus(payload)
            }
          }
        />
        {
          this.props.children
        }
      </View>
    )
  }
}
