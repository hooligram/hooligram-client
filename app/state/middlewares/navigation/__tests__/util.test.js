import { getFullRouteName } from '@state/middlewares/navigation/utils'

describe('navigation middleware utils', () => {
  describe('getFullRouteName', () => {
    it('should return correct route', () => {
      const tests = [
        {
          navigator: {
            state: {
              nav: {
                index: 0,
                routes: [
                  {
                    routeName: 'A',
                  }
                ]
              }
            }
          },
          expFullRouteName: '/A'
        },
        {
          navigator: {
            state: {
              nav: {
                index: 0,
                routes: [
                  {
                    index: 0,
                    routeName: 'A',
                    routes: [
                      {
                        routeName: 'B'
                      }
                    ]
                  }
                ]
              }
            }
          },
          expFullRouteName: '/A/B'
        },
        {
          navigator: {
            state: {
              nav: {
                index: 0,
                routes: [
                  {
                    index: 2,
                    routeName: 'A',
                    routes: [
                      {
                        routeName: 'B'
                      },
                      {
                        routeName: 'C'
                      },
                      {
                        routeName: 'D'
                      }
                    ]
                  }
                ]
              }
            }
          },
          expFullRouteName: '/A/D'
        },
        {
          navigator: {
            state: {
              nav: {
                index: 0,
                routes: [
                  {
                    index: 1,
                    routeName: 'A',
                    routes: [
                      {
                        routeName: 'B'
                      },
                      {
                        index: 0,
                        routeName: 'C',
                        routes: [
                          {
                            routeName: 'E'
                          }
                        ]
                      },
                      {
                        routeName: 'D'
                      }
                    ]
                  }
                ]
              }
            }
          },
          expFullRouteName: '/A/C/E'
        },
      ]

      tests.forEach(test => {
        const {
          navigator,
          expFullRouteName
        } = test

        const fullRouteName = getFullRouteName(navigator)

        expect(fullRouteName).toEqual(expFullRouteName)
      })
    })
  })
})