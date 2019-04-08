import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { dimensions } from 'hg/constants'

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
        bottomDivider={true}
        containerStyle={
          {
            paddingVertical: dimensions.PADDING_SMALL
          }
        }
        leftIcon={
          {
            name: 'person',
            raised: true,
            type: 'material'
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
