import { connect as _connect } from 'react-redux'
import { setPhoneNumber, setCountryCode } from '@state/actions/forms'
import { requestVerificationCode } from '@state/actions/api'

const mapStateToProps = (state) => {
  const {
    forms: {
      verification: {
        countryCodes: {
          options: countryCodes,
          selected: {
            code: selectedCountryCode,
            name: selectedCountryName
          }
        },
        phoneNumber
      }
    }
  } = state

  return {
    countryCodes,
    isLoading: false,
    selectedCountryCode,
    selectedCountryName,
    phoneNumber
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressNext: (countryCode, phoneNumber) => () => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
    },
    onSelectCountryCode: (countryCodes) => (_, index) => {
      const { 
        code: countryCode,
        name: countryName
      } = countryCodes[index]
      dispatch(setCountryCode(countryCode, countryName))
    },
    onChangeCountryCode: (_countryCode) => {
      const countryCode = _countryCode.replace(/[^0-9])/, '')
      dispatch(setCountryCode(countryCode))
    },
    onChangePhoneNumber: (phoneNumber) => {
      dispatch(setPhoneNumber(phoneNumber))
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
