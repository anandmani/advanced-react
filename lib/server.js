import express from 'express'
import config from './config'
import serverRender from 'renderers/server'  //Using absolute path instead of releative path. Node can resolve this as we have set NODE_PATH=./lib 
import { data } from './testData'

const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.static('public', { maxAge: 2592000 }))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  let appFile = 'app.js'
  let vendorFile = '/vendor.js'
  let runtimeFile = '/runtime.js'
  if (process.env.NODE_ENV == 'production') {
    fs.readFile(path.join(process.cwd(), 'public', 'manifest.json'), function (err, data) {
      if (err) {
        throw err
        // throw 'Production bundles not found'
      }
      const content = JSON.parse(data)
      runtimeFile = '/' + content['runtime.js']
      vendorFile = '/' + content['vendor.js']
      appFile = '/' + content['app.js']
    })

  }
  res.render('index', { ... await serverRender(), runtimeFile, vendorFile, appFile }, )

})

app.get('/data', (req, res) => {
  res.send(data)
})

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`)
})


