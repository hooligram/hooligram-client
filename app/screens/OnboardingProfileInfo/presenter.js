import { connect as _connect } from 'react-redux'
import { saveUserName } from 'hg/actions/profile'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserName: (userName) => () => {
      dispatch(saveUserName(userName))
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
