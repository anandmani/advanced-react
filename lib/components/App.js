import React, { Component } from 'react'
import ArticleList from './ArticleList'
// import DataApi from 'state-api'
// import axios from 'axios'

//Initially App is rendered by server with data.
//Then, when the bundle is fetched, App's initial state is {articles:{}, authors:{}} then after componentDidMount, we fetch the same data again. This is useless. 
// (We get a warning for this React attempted to reuse markup in a container but the checksum was invalid.)

//http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
//setLol is not bound to the class App. It works from any method (class function) as long as it's context is the class itself. But in an event handler, the context will not be that of the class. Therefore, the button's onClick will throw an error

export default class App extends Component {

  state = {
    articles: this.props.initialData.articles,
    authors: this.props.initialData.authors,
    lol: 1
  }

  // async componentDidMount() {
  //   const resp = await axios.get('/data')
  //   const data = new DataApi(resp.data)
  //   this.setState({
  //     articles: data.getArticles(),
  //     authors: data.getAuthors()
  //   })
  // }

  actions = {
    getAuthor: (authorId) => this.state.authors[authorId]
  }

  setLol() {
    this.setState({ lol: 2 })
  }

  gg(){
    this.setLol()
  }

  componentDidMount() {
    this.gg()
  }


  render() {
    return (
      <div>
        <button onClick={this.setLol}>lol</button>
        <ArticleList
          actions={this.actions}
          articles={this.state.articles}
        />
      </div>
    )
  }
}
