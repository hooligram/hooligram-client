
export const getFullRouteName = (navigator) => {
  const {
    state: {
      nav
    }
  } = navigator

  return _getFullRouteName(nav)
}

const _getFullRouteName = (route) => {
  const {
    routeName = '',
    routes,
    index
  } = route

  if (!routes || routes.length == 0) {
    return routeName
  }

  const childRoute = routes[index]

  return `${routeName}/${_getFullRouteName(childRoute)}`
}