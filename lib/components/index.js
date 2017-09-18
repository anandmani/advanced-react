import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

//TODO: try adding async function to non-bound class method
//Find out when to bind class methods 

export default class Index extends Component {

  /*

    asyncFunc() {
    return Promise.resolve(2)
  }

  async componentDidMount() {
    this.setState({
      value: await this.asyncFunc()
    })
  }


  */


  render() {
    return (
      <div>
        <App />
      </div>
    )
  }
}


ReactDOM.render(<Index />, document.getElementById('root'))
