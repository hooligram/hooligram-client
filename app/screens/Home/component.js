import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, View } from 'react-native'
import { colors } from 'hg/constants'

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Hooligram'
  }

  static propTypes = {}

  state = {}

  render() {
    return (
      <View
        style={{
          backgroundColor: colors.WHITE,
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <Button
          onPress={this.props.goToContact}
          title='Contacts'
        />
        <Button
          onPress={this.props.goToGroupMessage}
          title='Group message #1'
        />
        <Button
          onPress={this.props.goToGroupMessage}
          title='Group message #2'
        />
        <Button
          onPress={this.props.goToGroupMessage}
          title='Group message #3'
        />
        <Button
          color={colors.GOOGLE_RED}
          onPress={this.props.signOut}
          title='Sign out'
        />
      </View>
    )
  }
}
