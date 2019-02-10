import { connect as _connect } from 'react-redux'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      setTimeout(() => {
        dispatch({
          type: 'ONBOARDING_INITIALIZE_SUCCESS',
          payload: {}
        })
      }, 2000)
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
