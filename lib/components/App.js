import React, { Component } from 'react'
import ArticleList from './ArticleList'
// import DataApi from 'state-api'
// import axios from 'axios'

//Initially App is rendered by server with data.
//Then, when the bundle is fetched, App's initial state is {articles:{}, authors:{}} then after componentDidMount, we fetch the same data again. This is useless. 
// (We get a warning for this React attempted to reuse markup in a container but the checksum was invalid.)

//http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/ - When to bind an es6 class method. refer commit #177fa74308da22cc9239e6dba1b6f78bedbaf8b1

export default class App extends Component {

  state = this.props.store.getState()

  // async componentDidMount() {
  //   const resp = await axios.get('/data')
  //   const data = new DataApi(resp.data)
  //   this.setState({
  //     articles: data.getArticles(),
  //     authors: data.getAuthors()
  //   })
  // }

  render() {
    return (
      <div>
        <ArticleList
          articles={this.state.articles}
          store={this.props.store}
        />
      </div>
    )
  }
}
