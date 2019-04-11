import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Avatar, Divider } from 'react-native-elements'
import { ActionBar, ContactSnippet, NavigationView } from 'hg/components'
import { colors, dimensions } from 'hg/constants'
import { readContacts } from 'hg/db'

export default class GroupCreate extends Component {
  static navigationOptions = {
    headerTitle: 'New group'
  }

  static propTypes = {}

  state = {
    added: new Set(),
    contacts: []
  }

  render() {
    return (
      <NavigationView
        onWillFocus={
          () => {
            readContacts()
              .then((contacts) => {
                const added = contacts.filter((contact) => {
                  return contact.added
                })
                this.setState({ contacts: added })
              })
          }
        }
        style={
          {
            paddingHorizontal: dimensions.PADDING
          }
        }
      >
        <View
          style={
            {
              flexDirection: 'row'
            }
          }
        >
          <FlatList
            data={[...this.state.added]}
            horizontal={true}
            keyExtractor={(sid) => (sid)}
            renderItem={
              (item) => {
                return (
                  <View
                    style={
                      {
                        marginBottom: dimensions.MARGIN_XLARGE,
                        marginRight: dimensions.MARGIN
                      }
                    }
                  >
                    <Avatar
                      onPress={
                        () => {
                          const added = new Set(this.state.added)
                          added.delete(item.item)
                          this.setState({ added })
                        }
                      }
                      rounded
                      size='medium'
                      title={item.item.substring(item.item.length - 2)}
                    />
                  </View>
                )
              }
            }
          />
        </View>
        {
          this.state.added.size > 0
          &&
          <Divider
            style={
              {
                backgroundColor: colors.GREY
              }
            }
          />
        }
        <FlatList
          data={this.state.contacts.filter((contact) => {
            return !this.state.added.has(contact.sid)
          })}
          keyExtractor={(contact) => (contact.sid.toString())}
          renderItem={
            (item) => {
              return (
                <ContactSnippet
                  contact={{ sid: item.item.sid }}
                  onPress={
                    () => {
                      const added = new Set(this.state.added)
                      added.add(item.item.sid)
                      this.setState({ added })
                    }
                  }
                />
              )
            }
          }
        />
        <ActionBar
          leftActionIconName='arrow-back'
          leftActionOnPress={
            () => {
              this.props.navigation.goBack()
            }
          }
          mainActionIconName='add'
          mainActionOnPress={
            () => {
              this.props.goToGroupInfo([...this.state.added])
            }
          }
          rightActionIconName='clear'
          rightActionOnPress={
            () => {
              this.setState({ added: new Set() })
            }
          }
        />
      </NavigationView>
    )
  }
}
