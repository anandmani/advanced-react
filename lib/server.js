import express from 'express'
import config from './config'
import serverRender from 'renderers/server'  //Using absolute path instead of releative path. Node can resolve this as we have set NODE_PATH=./lib 
import { data } from './testData'

const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static('public', { maxAge: 2592000 }))

app.set('view engine', 'ejs')

const appendSlash = (path) => `/${path}`

app.get('/', async (req, res) => {
  if (process.env.NODE_ENV == 'production') {
    let content
    fs.readFile(path.join(process.cwd(), 'public', 'manifest.json'), function (err, data) {
      if (err) {
        throw err
      }
      content = JSON.parse(data)
    })
    const serverResponse = await serverRender()
    res.render('index-prod', { ...serverResponse, runtime: appendSlash(content['runtime.js']), vendor: appendSlash(content['vendor.js']), app: appendSlash(content['app.js']) })
  }
  else {
    res.render('index-dev', { ... await serverRender() })
  }
})

app.get('/data', (req, res) => {
  res.send(data)
})

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`)
})


