import { MESSAGING_BROADCAST_REQUEST } from '.'

export const broadcastMessageRequest = (message, country_code, phone_number) => {
  return {
    type: MESSAGING_BROADCAST_REQUEST,
    payload: {
      message,
      sender: {
        country_code,
        phone_number
      }
    }
  }
}