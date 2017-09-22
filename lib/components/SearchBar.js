import React, { Component } from 'react'
import debounce from 'lodash.debounce'

export default class SearchBar extends Component {
  state = {
    searchTerm: ''
  }
  handleSearch = debounce(() => this.props.handleSearch(this.state.searchTerm), 300)
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

