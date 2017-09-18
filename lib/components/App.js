import React, { Component } from 'react'
import ArticleList from './ArticleList'
import DataApi from '../DataApi'
import { data } from '../testData'

const api = new DataApi(data)

export default class App extends Component {

  state = {
    articles: api.getArticles(),
    authors: api.getAuthors()
  }

  render() {
    return (
      <div>
        <ArticleList
          authors={this.state.authors}
          articles={this.state.articles}
        />
      </div>
    )
  }
}
