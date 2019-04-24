import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { ActionBar, DirectMessageSnippet, MessageGroupSnippet, NavigationView } from 'hg/components'
import { app, groupTypes } from 'hg/constants'
import { readContact, readMessageGroupContacts, readMessageGroups } from 'hg/db'

const directMessageRecipient = {}

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Hooligram'
  }

  static propTypes = {
    currentUserSid: PropTypes.string.isRequired,
    goToContact: PropTypes.func.isRequired,
    goToDirectMessage: PropTypes.func.isRequired,
    goToGroupMessage: PropTypes.func.isRequired
  }

  state = {
    intervalId: 0,
    messageGroups: []
  }

  render() {
    return (
      <NavigationView
        onWillBlur={
          () => {
            clearInterval(this.state.intervalId)
          }
        }
        onWillFocus={
          () => {
            this.updateMessageGroups()

            const intervalId = setInterval(() => {
              this.updateMessageGroups()
            }, app.INTERVAL)

            this.setState({ intervalId })
          }
        }
      >
        <FlatList
          data={this.state.messageGroups
            .sort((a, b) => {
              if (moment(a.date_updated).isSame(b.date_updated)) {
                if (moment(a.date_created).isSame(b.date_created)) return 0
                return moment(a.date_created).isAfter(b.date_created) ? 1 : -1;
              }

              return moment(a.date_updated).isAfter(b.date_updated) ? 1 : -1;
            })
            .reverse()
          }
          keyExtractor={(messageGroup) => (messageGroup.id.toString())}
          renderItem={
            (item) => {
              return (
                item.item.type === groupTypes.DIRECT_MESSAGE
                ?
                (
                  directMessageRecipient[item.item.id]
                  ?
                  <DirectMessageSnippet
                    recipient={
                      directMessageRecipient[item.item.id]
                      ||
                      {
                        name: '',
                        sid: ''
                      }
                    }
                    onPress={
                      () => {
                        const groupId = item.item.id
                        this.props.goToDirectMessage(groupId)
                      }
                    }
                  />
                  :
                  null
                )
                :
                <MessageGroupSnippet
                  messageGroup={item.item}
                  onPress={
                    () => {
                      const groupId = item.item.id
                      this.props.goToGroupMessage(groupId)
                    }
                  }
                  userSid={this.props.currentUserSid}
                />
              )
            }
          }
        />
        <ActionBar
          mainActionIconName='dashboard'
          mainActionOnPress={
            () => {
              this.props.goToContact()
            }
          }
        />
      </NavigationView>
    )
  }

  updateMessageGroups() {
    readMessageGroups()
      .then((messageGroups) => {
        this.setState({ messageGroups })

        messageGroups.forEach((messageGroup) => {
          if (messageGroup.type === groupTypes.DIRECT_MESSAGE) {
            readMessageGroupContacts(messageGroup.id)
              .then((contacts) => {
                contacts.forEach((sid) => {
                  if (sid === this.props.currentUserSid) return

                  directMessageRecipient[messageGroup.id] = sid
                  readContact(sid)
                    .then((contact) => {
                      directMessageRecipient[messageGroup.id] = {
                        name: contact.name || '',
                        sid: contact.sid || ''
                      }
                    })
                })
              })
          }
        })
      })
  }
}
