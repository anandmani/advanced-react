import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './components/App'

//Note we are rendering App and not Index
export default () => ReactDOMServer.renderToString(<App />)