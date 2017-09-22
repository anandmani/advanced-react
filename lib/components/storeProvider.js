import React from 'react'
import PropTypes from 'prop-types'

//Don't know why we are doing it in a fancy way. Could have just made storeProvider take two parameters. One for Component and other for getExtraPropsFn instead of a fn tht returns a fn
//eg. export default (Component, extraPropsFn) => {}
export default (extraPropsFn) => (Component) => {

  const WithStore = (props, { store }) => <Component {...props} {...extraPropsFn(store, props) } store={store} />

  WithStore.contextTypes = {
    store: PropTypes.object
  }

  WithStore.displayName = `${Component.name}Container`

  return WithStore

}