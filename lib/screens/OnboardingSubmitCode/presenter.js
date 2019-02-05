import { connect as _connect } from 'react-redux'
import { setVerificationCode } from '@state/actions/forms'
import { 
  requestVerificationCode,
  submitVerificationCode
} from '@state/actions/api'

export const mapStateToProps = state => {
  const {
    profile: {
      codeRequest: {
        isLoading: isResendLoading
      },
      verification: {
        isLoading: isSubmitLoading
      }
    },
    forms: {
      verification: {
        phoneNumber,
        countryCodes: {
          selected: {
            code: countryCode
          }
        },
        code: verificationCode
      }
    }
  } = state

  const areaCode = phoneNumber.slice(0, 3)
  const phonePartOne = phoneNumber.slice(3, 6)
  const phonePartTwo = phoneNumber.slice(6, 10)
  const formattedPhoneNumber = `+${countryCode}`
    .concat(` (${areaCode})`)
    .concat(` ${phonePartOne}-${phonePartTwo}`)
  
  const isSubmitDisabled = verificationCode.length < 6

  return {
    isResendLoading,
    isSubmitDisabled,
    isSubmitLoading,
    phoneNumber: formattedPhoneNumber,
    verificationCode
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCode: (code) => {
      if (code.length > 6) {
        return
      }
      dispatch(setVerificationCode(code))
    },
    resendSMS: (countryCode, phoneNumber) => () => {
      dispatch(requestVerificationCode(countryCode, phoneNumber))
    },
    submitCode: (code) => () => {
      dispatch(submitVerificationCode(code))
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
