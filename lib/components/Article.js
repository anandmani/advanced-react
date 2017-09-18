import React from 'react'

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
    fontSize: '0.85rem',
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

const Article = ({ article, author }) => <div style={styles.article}>
  <div style={styles.title}>{article.title}</div>
  <div style={styles.date}>{getDate(article.date)}</div>
  <div style={styles.author}>
    <a href={author.website}>
      {author.firstName} {author.lastName}
    </a>
  </div>
  <div style={styles.body}>{article.body}</div>
</div>

export default Article