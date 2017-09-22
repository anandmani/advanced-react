import StateApi from 'state-api'
import { data } from '../testData' //You can import from JSON without any export? 

const api = new StateApi(data)

describe('DataApi', () => {

  it('exposes articles as an object', () => {
    const articles = api.getState().articles
    const articleId = data.articles[0].id
    const articleTitle = data.articles[0].title
    expect(articles).toHaveProperty(articleId)
    expect(articles[articleId].title).toBe(articleTitle)
  })

  it('exposes authors as an object', () => {
    const authors = api.getState().authors
    const authorId = data.authors[0].id
    const authorFirstName = data.authors[0].firstName
    expect(authors).toHaveProperty(authorId)
    expect(authors[authorId].firstName).toBe(authorFirstName)
  })

})