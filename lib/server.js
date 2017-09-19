import express from 'express'
import config from './config'
import serverRender from 'renderers/server'  //Using absolute path instead of releative path. Node can resolve this as we have set NODE_PATH=./lib 
import { data } from './testData'

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  res.render('index', { ... await serverRender() })
})

app.get('/data', (req, res) => {
  res.send(data)
})

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`)
})


