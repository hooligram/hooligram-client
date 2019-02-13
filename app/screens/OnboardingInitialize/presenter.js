import { connect as _connect } from 'react-redux'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      const randomTimeout = 500 + Math.random() * 1500
      setTimeout(() => {
        dispatch({
          type: 'ONBOARDING_INITIALIZE_SUCCESS',
          payload: {}
        })
      }, randomTimeout)
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
