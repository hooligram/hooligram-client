import { SEND_MESSAGE } from '@state/actions/api'
import { 
  SET_CURRENT_MESSAGE,
  FORMS_VERIFICATION_SET_PHONE_NUMBER,
  FORMS_VERIFICATION_SET_COUNTRY_CODE
} from '@state/actions/forms'

export const initialState = {
  chat: {
    currentMessage: ''
  },
  verification: {
    phoneNumber: '',
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
    }
  }
}

const forms = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        chat: {
          currentMessage: ''
        },
        verification: { 
          ...state.verification,
          countryCodes: {
            options: [ ...state.verification.countryCodes.options ],
            selected: { ...state.verification.countryCodes.selected }
          }
        }
      }
    }

    case SET_CURRENT_MESSAGE: {
      const {
        payload: {
          message
        }
      } = action

      return {
        chat: {
          currentMessage: message
        },
        verification: { 
          ...state.verification,
          countryCodes: {
            options: [ ...state.verification.countryCodes.options ],
            selected: { ...state.verification.countryCodes.selected }
          }
        }
      }
    }

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

    default:
      return state
  }
}

export default forms
