import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { readIsDirectMessage, readMessageGroupContacts } from 'hg/db'

export default class MessageGroupSnippet extends Component {
  static propTypes = {
    messageGroup: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    onPress: PropTypes.func.isRequired,
    userSid: PropTypes.string.isRequired
  }

  state = {
    isDirectMessage: false,
    contactSids: []
  }

  render() {
    const groupName = this.props.messageGroup.name
    const recipients = this.state.contactSids.reduce((res, cur) => {
      if (cur === this.props.userSid) return res

      return [...res, cur]
    }, [])
    const title = this.state.isDirectMessage ? recipients[0] : groupName
    return (
      <ListItem
        onPress={
          () => {
            this.props.onPress()
          }
        }
        subtitle={this.state.isDirectMessage ? null : recipients.join(', ')}
        title={title}
      />
    )
  }

  componentDidMount() {
    readIsDirectMessage(this.props.messageGroup.id)
      .then((isDirectMessage) => {
        this.setState({ isDirectMessage })
      })

    readMessageGroupContacts(this.props.messageGroup.id)
      .then((contactSids) => {
        this.setState({ contactSids })
      })
  }
}
