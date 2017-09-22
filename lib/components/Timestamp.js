import React, { Component } from 'react'
import storeProvider from './storeProvider'

class Timestamp extends Component {
  render() {
    return (
      <div>
        {this.props.timestamp.toString()}
      </div>
    )
  }
}

const getExtraProps = (store) => ({ timestamp: store.getState().timestamp })

export default storeProvider(getExtraProps)(Timestamp)