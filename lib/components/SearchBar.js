import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import storeProvider from './storeProvider'

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }
  handleSearch = debounce(() => this.props.store.setSearchTerm(this.state.searchTerm), 300)
  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value }, () => this.handleSearch())
  }
  render() {
    return (
      <input
        type='search'
        placeholder='Search...'
        onChange={this.handleChange}
      />
    )
  }
}

export default storeProvider()(SearchBar)