import { 
  FORMS_VERIFICATION_SET_PHONE_NUMBER,
  FORMS_VERIFICATION_SET_COUNTRY_CODE,
  FORMS_VERIFICATION_SET_CODE,
  FORMS_SET_USERNAME_INPUT
} from '@state/actions'

export const initialState = {
  chat: {
    currentMessage: ''
  },
  userNameInput: '',
  verification: {
    code: '',
    countryCodes: {
      options: [
        {
          code: '60',
          name: 'Malaysia'
        }, 
        {
          code: '1',
          name: 'Canada',
        }, 
        {
          code: '1',
          name: 'United States'
        }, 
        {
          code: '65',
          name: 'Singapore'
        }
      ],
      selected: {
        code: '60',
        name: 'Malaysia'
      }
    },
    phoneNumber: '',
  }
}

const forms = (state = initialState, action) => {
  switch (action.type) {
    case FORMS_VERIFICATION_SET_PHONE_NUMBER: {
      const {
        payload: {
          phoneNumber
        }
      } = action

      return {
        chat: {
          ...state.chat
        },
        verification: { 
          ...state.verification,
          countryCodes: {
            options: [ ...state.verification.countryCodes.options ],
            selected: { ...state.verification.countryCodes.selected }
          },
          phoneNumber
        },
      }
    }

    case FORMS_VERIFICATION_SET_COUNTRY_CODE: {
      const {
        payload: {
          countryCode,
          countryName
        }
      } = action

      return {
        chat: {
          ...state.chat
        },
        verification: {
          ...state.verification,
          countryCodes: {
            options: [ ...state.verification.countryCodes.options ],
            selected: {
              code: countryCode,  
              name: countryName
            }
          },
        }
      }
    }

    case FORMS_VERIFICATION_SET_CODE: {
      const {
        payload: {
          code
        }
      } = action

      return {
        chat: {
          ...state.chat
        },
        verification: {
          ...state.verification,
          countryCode: {
            ...state.verification.countryCodes
          },
          code
        }
      }
    }

    case FORMS_SET_USERNAME_INPUT: {
      const {
        payload: {
          userNameInput
        }
      } = action

      return {
        ...state,
        chat: {
          ...state.chat
        },
        userNameInput,
        verification: {
          ...state.verification,
          countryCodes: {
            ...state.verification.countryCodes
          }
        }
      }
    }

    default:
      return state
  }
}

export default forms
