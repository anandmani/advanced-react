import React from 'react'
import renderer from 'react-test-renderer'
import ArticleList from '../ArticleList'

require('babel-polyfill') //https://github.com/facebook/jest/issues/3687    Jest doesn't require babel-polyfill so, Object.values is not supported in jest.
// Object.values = (obj) => Object.keys(obj).map((key) => obj[key])

describe('ArticleList', () => {

  it('renders correctly', () => {
    const testProps = {
      articles: {
        1: {
          id: '1'
        },
        2: {
          id: '2'
        }
      },
      actions: {
        getAuthor: () => ({})
        // getAuthor: jest.fn(() => ({}))  //when to use function mocks?
      }
    }

    const tree = renderer.create(
      <ArticleList
        {...testProps}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})