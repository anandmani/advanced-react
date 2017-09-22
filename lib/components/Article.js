import React from 'react'
import PropTypes from 'prop-types'

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

const Article = ({ article }, { store }) => {
  const author = store.getAuthor(article.authorId)
  return <div style={styles.article}>
    <div style={styles.title}>{article.title}</div>
    <div style={styles.date}>{getDate(article.date)}</div>
    <div style={styles.author}>
      <a href={author.website}>
        {author.firstName} {author.lastName}
      </a>
    </div>
    <div style={styles.body}>{article.body}</div>
  </div>
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })
}

Article.contextTypes = {
  store: PropTypes.object
}

export default Article

