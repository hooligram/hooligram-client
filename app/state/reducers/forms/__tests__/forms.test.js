import formsReducer from '@state/reducers/forms/forms'
import { initialState } from '@state/reducers/forms/forms'

describe('forms reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const action = {}

      const nextState = formsReducer(undefined, action)

      expect(nextState).toEqual(initialState)
    })
  })

  describe('action is `SEND_MESSAGE`', () => {
    it('should clear `currentMessage`', () => {
      const state = { 
        chat: {
          currentMessage: 'Ohaiyo gozaimasu'
        },
        verification: {
          phoneNumber: '123456',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      }
      const action = { 
        type: 'SEND_MESSAGE',
        payload: {}
      }

      const nextState = formsReducer(state, action)

      expect(nextState).toEqual({
        chat: {
          currentMessage: ''
        },
        verification: {
          phoneNumber: '123456',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      })
    })
  })

  describe('action is `SET_CURRENT_MESSAGE`', () => {
    it('should set `currentMessage` from action payload', () => {
      const state = { 
        chat: {
          currentMessage: 'Ohaiyo ...'
        },
        verification: {
          phoneNumber: '123456',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      }
      const action = {
        type: 'SET_CURRENT_MESSAGE',
        payload: {
          message: 'Ohaiyo ... gozaimasu'
        }
      }

      const nextState = formsReducer(state, action)

      expect(nextState).toEqual({ 
        chat: {
          currentMessage: 'Ohaiyo ... gozaimasu'
        },
        verification: {
          phoneNumber: '123456',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      })
    })
  })

  describe('action is `FORMS:VERIFICATION_SET_PHONE_NUMBER`', () => {
    it('should set using `phoneNumber` from action payload', () => {
      const state = { 
        chat: {
          currentMessage: 'Ohaiyo ...'
        },
        verification: {
          phoneNumber: '',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      }
      const action = {
        type: 'FORMS:VERIFICATION_SET_PHONE_NUMBER',
        payload: {
          phoneNumber: '123456'
        }
      }

      const nextState = formsReducer(state, action)

      expect(nextState).toEqual({ 
        chat: {
          currentMessage: 'Ohaiyo ...'
        },
        verification: {
          phoneNumber: '123456',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      })
    })
  })

  it('should deep copy remaining previous state', () => {
    const state = { 
      chat: {
        currentMessage: 'Ohaiyo ...'
      },
      verification: {
        phoneNumber: '',
        countryCodes: {
          options: [
            {
              code: '10',
              name: 'Some country name'
            }
          ],
          selected: {
            code: '10',
            name: 'Some country name'
          }
        }
      }
    }
    const action = {
      type: 'FORMS:VERIFICATION_SET_PHONE_NUMBER',
      payload: {
        phoneNumber: '123'
      }
    }

    const nextState = formsReducer(state, action)

    expect(nextState === state).toEqual(false)
    expect(nextState.chat === state.chat).toEqual(false)
    expect(nextState.verification === state.verification).toEqual(false)
    expect(nextState.verification.countryCodes === state.verification.countryCodes).toEqual(false)
    expect(nextState.verification.countryCodes.options === state.verification.countryCodes.options).toEqual(false)
    expect(nextState.verification.countryCodes.selected === state.verification.countryCodes.selected).toEqual(false)
  })

  describe('action is `FORMS:VERIFICATION_SET_COUNTRY_CODE`', () => {
    it('should set using `countryCode` & `countryName` from action payload', () => {
      const state = { 
        chat: {
          currentMessage: 'Ohaiyo ...'
        },
        verification: {
          phoneNumber: '',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '10',
              name: 'Some country name'
            }
          }
        }
      }
      const action = {
        type: 'FORMS:VERIFICATION_SET_COUNTRY_CODE',
        payload: {
          countryCode: '999',
          countryName: 'Some other country name'
        }
      }

      const nextState = formsReducer(state, action)

      expect(nextState).toEqual({ 
        chat: {
          currentMessage: 'Ohaiyo ...'
        },
        verification: {
          phoneNumber: '',
          countryCodes: {
            options: [
              {
                code: '10',
                name: 'Some country name'
              }
            ],
            selected: {
              code: '999',
              name: 'Some other country name'
            }
          }
        }
      })
    })
  })

  it('should deep copy remaining previous state', () => {
    const state = { 
      chat: {
        currentMessage: 'Ohaiyo ...'
      },
      verification: {
        phoneNumber: '',
        countryCodes: {
          options: [
            {
              code: '10',
              name: 'Some country name'
            }
          ],
          selected: {
            code: '10',
            name: 'Some country name'
          }
        }
      }
    }
    const action = {
      type: 'FORMS:VERIFICATION_SET_COUNTRY_CODE',
      payload: {
        countryCode: '1'
      }
    }

    const nextState = formsReducer(state, action)

    expect(nextState === state).toEqual(false)
    expect(nextState.chat === state.chat).toEqual(false)
    expect(nextState.verification === state.verification).toEqual(false)
    expect(nextState.verification.countryCodes === state.verification.countryCodes).toEqual(false)
    expect(nextState.verification.countryCodes.options === state.verification.countryCodes.options).toEqual(false)
    expect(nextState.verification.countryCodes.selected === state.verification.countryCodes.selected).toEqual(false)
  })
})
