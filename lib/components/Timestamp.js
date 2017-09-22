import React, { Component } from 'react'

export default class Timestamp extends Component {
  render() {
    return (
      <div>
        {this.props.timestamp.toString()}
      </div>
    )
  }
}
