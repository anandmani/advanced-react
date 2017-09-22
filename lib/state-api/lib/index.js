//TODO: Convert methods into arrow functions?

class StateApi {
  constructor(rawData) {
    this.rawData = rawData
    this.data = {
      articles: this.mapArrayIntoObject(rawData.articles),
      authors: this.mapArrayIntoObject(rawData.authors),
      searchTerm: ''
    }
  }
  mapArrayIntoObject(array) {
    return array.reduce((accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.id]: currentValue
    }), {})
  }
  getState = () => {
    return this.data
  }
  getAuthor = (authorId) => {
    return this.data.authors[authorId]
  }
}

export default StateApi