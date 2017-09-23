import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import storeProvider from './storeProvider'

//Keep styles outside as a new style object will be created on every render!
const styles = {
  article: {
    paddingBottom: 10,
    borderBottom: '1px solid black',
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    fontSize: '0.8rem',
    color: '#888'
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10
  },
  body: {
    paddingLeft: 20
  }
}

const getDate = (date) => new Date(date).toDateString()

class Article extends PureComponent {
  render() {
    return (
      <div style={styles.article}>
        <div style={styles.title}>{this.props.article.title}</div>
        <div style={styles.date}>{getDate(this.props.article.date)}</div>
        <div style={styles.author}>
          <a href={this.props.author.website}>
            {this.props.author.firstName} {this.props.author.lastName}
          </a>
        </div>
        <div style={styles.body}>{this.props.article.body}</div>
      </div>
    )
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),
  store: PropTypes.object
}

const getExtraProps = (store, props) => ({ author: store.getAuthor(props.article.authorId) })

export default storeProvider(getExtraProps)(Article) //similar to redux connect
//Don't know why we are doing it in a fancy way. Could have just made storeProvider take two parameters. One for Component and other for getExtraPropsFn instead of a fn tht returns a fn
