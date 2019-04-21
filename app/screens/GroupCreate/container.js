import { connect } from 'react-redux'
import { groupCreateRequest } from 'hg/actions'
import {
  currentUserCountryCode,
  currentUserPhoneNumber,
  currentUserSid
} from 'hg/selectors'
import component from './component'

const mapDispatchToProps = (dispatch) => {
  return {
    groupCreateRequest: (actionId, groupName, memberSids) => {
      dispatch(groupCreateRequest(actionId, groupName, memberSids))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    countryCode: currentUserCountryCode(state),
    currentUserSid: currentUserSid(state),
    phoneNumber: currentUserPhoneNumber(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
