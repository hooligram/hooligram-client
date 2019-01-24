import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import hooligramApi from './lib/hooligram-api'
import Echo from '@screens/Echo'
import VerifyPhoneNumber from '@screens/VerifyPhoneNumber'
import STRING from '@resources/Strings'

export default class App extends Component {
  state = {
    messages: [],
    currentMessage: '',
    navigation: {
      route: 'verifyPhoneNumber'
    },
    forms: {
      countryCodes: [{
        label: 'United States',
        value: '+1'
      }, {
        label: 'Canada',
        value: '+1'
      }, {
        label: 'Malaysia',
        value: '+60'
      }],
      selectedCountryCode: {
        label: 'Malaysia',
        value: '+60'
      },
      phoneNumber: '6478637073'
    }
  }

  store = {
    dispatch: (action) => {
      console.log('action', action)
      console.log('(kinda) reducer')

      switch (action.type) {
        case 'SEND_MESSAGE': {
          const {
            payload: {
              message
            }
          } = action
          const { messages } = this.state
          this.setState({
            messages: messages.concat(message)
          })
          break
        }
        case 'NAVIGATE': {
          const {
            payload: {
              to
            }
          } = action
          this.setState({
            navigation: {
              route: to
            }
          })
          break
        }
        case 'FORMS:SET_SELECTED_COUNTRY': {
          const {
            payload: {
              label,
              value
            }
          } = action
          this.setState({
            forms: {
              selectedCountryCode: {
                value,
                label
              },
              countryCodes: [].concat(this.state.forms.countryCodes),
              phoneNumber: ''.concat(this.state.forms.phoneNumber)
            }
          })
          break
        }
        default:
          break
      }
    },
    setState: (newState) => {
      console.log('prevState', this.state)
      this.setState(newState, () => {
        console.log('nextState', newState)
      })
    },
    getState: () => {
      return this.state
    }
  }

  api = hooligramApi(this.store)

  render() {
    const {
      messages,
      currentMessage,
      navigation: {
        route
      },
      forms: {
        countryCodes,
        selectedCountryCode,
        phoneNumber
      }
    } = this.store.getState()
    const {
      description,
      title,
      btnNext
    } = STRING

    switch (route) {
      case 'echo':
        return (
          <Echo
            messages={messages}
            currentMessage={currentMessage}
            handleChangeText={this.handleChangeText}
            handlePressButton={this.handlePressButton}/>
        )
      case 'verifyPhoneNumber':
        return (
          <VerifyPhoneNumber
            texts={{ description, title, btnNext }}
            countryCodes={countryCodes}
            selectedCountryCode={selectedCountryCode}
            phoneNumber={phoneNumber}
            onPressNext={this.handlePressVerifyPhoneNumber}
            onSelectCountryCode={this.handleSelectCountryCode}/>
        )
      default:
        return null
    }
  }

  handleChangeText = (value) => {
    this.store.setState({
      currentMessage: value
    })
  }

  handlePressButton = () => {
    const { currentMessage: message } = this.store.getState()
    const action = {
      type: 'SEND_MESSAGE',
      payload: {
        message
      }
    }
    this.store.setState({
      currentMessage: ''
    })
    this.api.send(JSON.stringify(action))
  }

  handlePressVerifyPhoneNumber = () => {
    this.store.dispatch({
      type: 'NAVIGATE',
      payload: {
        to: 'echo'
      }
    })
  }

  handleSelectCountryCode = (label) => {
    const value = this.state.forms.countryCodes
      .filter(({ label: _label }) => _label === label)
      .map(e => e.value)
      [0]
    this.store.dispatch({
      type: 'FORMS:SET_SELECTED_COUNTRY',
      payload: {
        value,
        label
      }
    })
  }
}
