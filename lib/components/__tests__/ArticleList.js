import React from 'react'
// import renderer from 'react-test-renderer'
import ArticleList from '../ArticleList'
import { shallow } from 'enzyme'

//TODO: add test for context

require('babel-polyfill') //https://github.com/facebook/jest/issues/3687    Jest doesn't require babel-polyfill so, Object.values is not supported in jest.
// Object.values = (obj) => Object.keys(obj).map((key) => obj[key])

describe('ArticleList', () => {

  it('renders correctly', () => {
    const testProps = {
      articles: {
        1: {
          id: '1',
          title: 'title',
          date: 'date',
          body: 'body'
        },
        2: {
          id: '2',
          title: 'title',
          date: 'date',
          body: 'body'
        }
      },
      // store: {  //Removing store as a prop. Moving it to context
      //   getAuthor: () => ({})
      //   // getAuthor: jest.fn(() => ({}))  //when to use function mocks?
      // }
    }

    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    )

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('ArticleContainer')).toHaveLength(2)
  })

})