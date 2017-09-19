import React, { Component } from 'react'
import ArticleList from './ArticleList'
import DataApi from 'state-api'
import axios from 'axios'

export default class App extends Component {

  state = {
    articles: this.props.initialData.articles,
    authors: this.props.initialData.authors
  }

  async componentDidMount() {
    const resp = await axios.get('/data')
    const data = new DataApi(resp.data)
    this.setState({
      articles: data.getArticles(),
      authors: data.getAuthors()
    })
  }

  actions = {
    getAuthor: (authorId) => this.state.authors[authorId]
  }

  render() {
    return (
      <div>
        <ArticleList
          actions={this.actions}
          articles={this.state.articles}
        />
      </div>
    )
  }
}
