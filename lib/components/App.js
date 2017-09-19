import React, { Component } from 'react'
import ArticleList from './ArticleList'
import DataApi from 'state-api'
import { data } from '../testData'

const api = new DataApi(data)

export default class App extends Component {

  state = {
    articles: api.getArticles(),
    authors: api.getAuthors()
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
