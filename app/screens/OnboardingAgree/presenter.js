import { connect as _connect } from 'react-redux'

export const mapStateToProps = () => ({})

export const mapDispatchToProps = dispatch => {
  return {
    agreeAndContinue: () => {
      dispatch({
        type: 'AGREE_AND_CONTINUE',
        payload: {}
      })
    }
  }
}

export const connect = _connect(
  mapStateToProps,
  mapDispatchToProps
)
