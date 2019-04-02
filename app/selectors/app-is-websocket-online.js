export default (state) => {
  if (!state) return false
  if (!state.app) return false

  return state.app.isWebsocketOnline
}
