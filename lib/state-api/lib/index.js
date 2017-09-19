class DataApi {
  constructor(rawData) {
    this.rawData = rawData
  }
  mapArrayIntoObject(array) {
    return array.reduce((accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.id]: currentValue
    }), {})
  }
  getArticles() {
    return this.mapArrayIntoObject(this.rawData.articles)
  }
  getAuthors() {
    return this.mapArrayIntoObject(this.rawData.authors)
  }
}

export default DataApi