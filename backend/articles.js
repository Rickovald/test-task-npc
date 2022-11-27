const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

const createArticle = (request, response) => {
  const { AuthorID, Name, Content } = request.body

  pool.query('INSERT INTO articles (AuthorID, Name, Content) VALUES ($1, $2, $3) RETURNING *', [AuthorID, Name, Content], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Article added with ID: ${results.rows[0].id}`)
  })
}

const getArticles = (request, response) => {
    pool.query('SELECT * FROM articles ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
const getArticleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM articles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateArticle = (request, response) => {
  const id = parseInt(request.params.id)
  const { AuthorID, Name, Content } = request.body

  pool.query(
    'UPDATE articles SET AuthorID = $1, Name = $2, Content = $3 WHERE id = $3',
    [AuthorID, Name, Content, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Article modified with ID: ${id}`)
    }
  )
}

const deleteArticle = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM articles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Article deleted with ID: ${id}`)
  })
}

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
}