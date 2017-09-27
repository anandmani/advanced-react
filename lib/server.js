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
  let scripts
  if (process.env.NODE_ENV == 'production') {
    fs.readFile(path.join(process.cwd(), 'public', 'manifest.json'), function (err, data) {
      if (err) {
        throw err
      }
      const content = JSON.parse(data)
      scripts = [appendSlash(content['runtime.js']), appendSlash(content['vendor.js']), appendSlash(content['app.js'])]
    })
  }
  else {
    scripts = ['/vendor.js', '/app.js'] //Not caching properly for dev
  }
  // let scripts = ['/vendor.js', '/app.js'] //Not caching properly for dev
  res.render('index', { ... await serverRender(), scripts })
  // res.render('index', { ... await serverRender(), vendor: '/vendor.js', app: '/app.js' }, )
})

app.get('/data', (req, res) => {
  res.send(data)
})

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`)
})


