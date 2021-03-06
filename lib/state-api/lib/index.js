//TODO: Convert methods into arrow functions?

class StateApi {
  constructor(rawData) {
    this.rawData = rawData
    this.data = {
      articles: this.mapArrayIntoObject(rawData.articles),
      authors: this.mapArrayIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date
    }
    this.lastSubscriptionId = 0
    this.subscriptions = {}
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
  subscribe = (cb) => {
    this.subscriptions[this.lastSubscriptionId] = cb
    return this.lastSubscriptionId++
  }
  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId]
  }
  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb(this.data))
  }
  mergeWithState = (newData) => {
    this.data = {
      ...this.data,
      ...newData
    }
    this.notifySubscribers()
  }
  setSearchTerm = (searchTerm) => {
    this.mergeWithState({ searchTerm })
  }
  startClock = () => {
    setInterval(() => this.mergeWithState({ timestamp: new Date }), 1000)
  }
}

export default StateApi