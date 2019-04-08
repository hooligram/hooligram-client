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
