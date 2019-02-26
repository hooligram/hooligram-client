import { mapStateToProps } from '@screens/Conversation/presenter'

describe('Conversation screen presenter', () => {
  describe('mapStateToProps', () => {
    let state
    beforeEach(() => {
      state = {
        messages: {
          byId: {
            id1: {
              id: 'id1',
              message: 'message 1',
              sender: {
                country_code: '1',
                phone_number: '123456789'
              }
            },
            id2: {
              id: 'id2',
              message: 'message 2',
              sender: {
                country_code: '60',
                phone_number: '987654321'
              }
            },
            id3: {
              id: 'id3',
              message: 'message 3',
              sender: {
                country_code: '65',
                phone_number: '123123123'
              }
            }
          },
          allIds: ['id1', 'id2', 'id3']
        },
        profile: {
          userName: '',
        },
        authorization: {
          token: '',
          country_code: '1',
          phone_number: '123456789'
        }
      }
    })

    it('should map messages correctly', () => {
      const props = mapStateToProps(state)

      expect(props.messages).toEqual([
        {
          message: 'message 1',
          sender: '+1 123456789',
          isCurrentUser: true
        },
        {
          message: 'message 2',
          sender: '+60 987654321',
          isCurrentUser: false
        },
        {
          message: 'message 3',
          sender: '+65 123123123',
          isCurrentUser: false
        }
      ])
    })
  })
})
