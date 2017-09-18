import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//TODO: try adding async function to non-bound class method

export default class App extends Component {
  state = {
    value: 1
  }

  asyncFunc = () => Promise.resolve(2)

  async componentDidMount() {
    this.setState({
      value: await this.asyncFunc()
    })
  }


  render() {
    return (
      <div>
        {this.state.value}
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
