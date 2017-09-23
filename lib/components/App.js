import React, { Component } from 'react'
import ArticleList from './ArticleList'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import Timestamp from './Timestamp'
import Perf from 'react-addons-perf'

if (typeof window !== 'undefined') { //Because in SSR, there is no window
  window.Perf = Perf
  //Use Perf.printWasted() to get rid of unnecessary renders
}

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

  //Dont keep propTypes and contextTypes as instance properties. Make them statuc properties as they are shared by all instances of this class! Don't have to create a new object for every instance
  // contextTypes = {
  //   store: PropTypes.object
  // }

  updateState = (newState) => this.setState(newState)

  componentDidMount = () => {
    this.subscriptionId = this.props.store.subscribe(this.updateState)
    this.props.store.startClock()
    console.log("starting perf")
    Perf.start()
    setTimeout(() => {
      console.log("Stoping perf")
      Perf.stop()
    }, 5000)
  }

  componentWillUnmount = () => {
    this.props.store.unsubscribe(this.subscriptionId)
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  filterArticles = () => {  //or use lodash pickBy
    const articles = {}
    const searchRE = new RegExp(this.state.searchTerm, 'i')
    Object.values(this.state.articles).forEach((item, index) => {
      if (item.title.match(this.state.searchTerm) || item.body.match(searchRE)) {
        articles[Object.keys(this.state.articles)[index]] = item
      }
    })
    return articles
  }

  render() {
    let articles = this.filterArticles()
    return (
      <div>
        <SearchBar />
        <Timestamp />
        <ArticleList
          articles={articles}
        />
      </div>
    )
  }
}

App.childContextTypes = {
  store: PropTypes.object
}
