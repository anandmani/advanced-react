import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App' //NODE_PATH will node work for this, because webpack uses its own logic. Thus, we set resolve in wepback.config
import StateApi from 'state-api'

//TODO: try adding async function to non-bound class method
//Find out when to bind class methods 

const store = new StateApi(window.initialData)

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
        <App store={store} />
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
