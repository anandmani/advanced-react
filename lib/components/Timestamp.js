import React, { Component } from 'react'
import storeProvider from './storeProvider'

class Timestamp extends Component {
  static timeDisplay = (timestamp) => timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  render() {
    return (
      <div>
        {this.props.timestampDisplay}
      </div>
    )
  }
}

const getExtraProps = (store) => ({ timestampDisplay: Timestamp.timeDisplay(store.getState().timestamp) }) //Note: This fn is sent as a callback to storeProvider. Although in this scope, the function can see timeDisplay function, we can't invoke it with this.timeDisplay because the context is different. 'this' will be in the context of WithStore where timeDisplay isn't avaiable. Therefore we make it static and invoke it with Timestamp.timeDisplay as (Timestamp is visible in this scope)

export default storeProvider(getExtraProps)(Timestamp)

//This works right now in the following way:
//TimestampContainer (the HOC returned by storeProivder) has no props, context = {store}
//Timestamp has props {timestamp} which changes in the store
//App has state = store.getState(). Every second, this state changes and thus, it's child TimestampContainer re-renders (eventhough it's props don't change) and in turn, Timestamp re-renders
//Technically we need to stop TimestampContainer from re-rendering as it's props don't change

//Timestamp container won't work when WithStore component is a PureComponent because, when App re-renders, TimestampContainer won't re-render as it's props (null) and context (store) do not change. Thus, Timestamp (which can only re-render with new props) does not get new props