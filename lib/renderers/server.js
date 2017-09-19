import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from 'components/App'

//Note we are rendering App and not Index
// export default () => ReactDOMServer.renderToString(<App />)

//Wrapping App inside div because, in Index.js, that's what we do. Else we get this warning: React attempted to reuse markup in a container but the checksum was invalid. 
//This does really go hand in hand with server side rendering 
export default () => ReactDOMServer.renderToString(<div><App /></div>)