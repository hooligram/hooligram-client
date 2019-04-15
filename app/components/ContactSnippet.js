import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'

export default class ContactSnippet extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      sid: PropTypes.string.isRequired
    }),
    onPress: PropTypes.func.isRequired
  }

  render() {
    return (
      <ListItem
        containerStyle={
          {
            padding: 0
          }
        }
        leftIcon={
          {
            name: 'person',
            raised: true,
            type: 'material'
          }
        }
        onLongPress={
          () => {
            if (!this.props.onLongPress) return

            this.props.onLongPress()
          }
        }
        onPress={
          () => {
            this.props.onPress()
          }
        }
        title={this.props.contact.sid}
      />
    )
  }
}
