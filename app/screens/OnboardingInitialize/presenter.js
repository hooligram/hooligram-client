import { connect as _connect } from 'react-redux'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      dispatch({
        type: 'ONBOARDING_INITIALIZE_SUCCESS',
        payload: {}
      })
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
