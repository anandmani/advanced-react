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

//This works right now in the following way:
//TimestampContainer (the HOC returned by storeProivder) has no props, context = {store}
//Timestamp has props {timestamp} which changes in the store
//App has state = store.getState(). Every second, this state changes and thus, it's child TimestampContainer re-renders (eventhough it's props don't change) and in turn, Timestamp re-renders
//Technically we need to stop TimestampContainer from re-rendering as it's props don't change

//Timestamp container won't work when WithStore component is a PureComponent because, when App re-renders, TimestampContainer won't re-render as it's props (null) and context (store) do not change. Thus, Timestamp (which can only re-render with new props) does not get new props