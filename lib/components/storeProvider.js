import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

//Don't know why we are doing it in a fancy way. Could have just made storeProvider take two parameters. One for Component and other for getExtraPropsFn instead of a fn tht returns a fn
//eg. export default (Component, extraPropsFn) => {}


export default (extraPropsFn = () => ({})) => (Component) => {
  class WithStore extends PureComponent {
    usedState = () => extraPropsFn(this.context.store, this.props)
    state = this.usedState()
    onStoreChange = () => {
      this.setState(this.usedState())
      // this.forceUpdate() //This is very inefficient as the Component will re-render for any change in the store. Not just the ones that are subscribed to
    }
    componentDidMount = () => {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange)
    }
    componentWillUnmount = () => {
      this.context.store.unsubscribe(this.subscriptionId)
    }
    render() {
      return (
        <Component
          {...this.props}
          {...this.usedState() }
          store={this.context.store}
        />
      )
    }
  }
  WithStore.contextTypes = {
    store: PropTypes.object
  }
  WithStore.displayName = `${Component.name}Container`
  return WithStore
}