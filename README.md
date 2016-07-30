Simple Express.js router middleware for sites that use React Router.

### Server

```javascript
import express from 'express'
import RouterServer from 'react-router-router/server'
import routes from './routes'
import reducers from './reducers' // Redux reducers

let app = express()
let router = RouterServer({ routes, reducers })

app.set('port', (process.env.PORT || 5000))

// The page will look for a JavaScript file at `main.js`. 
// I’m webpacking the client script to `public/main.js` and using the `public/` directory for static assets
app.use(express.static('public'))
app.use('/', router);

app.listen(app.get('port'), function () {
  console.log('Listening at port', app.get('port'))
});
```

### Client

```javascript
import RouterClient from 'react-router-router/client'
import routes from './routes'
import reducers from './reducers' // Redux reducers

RouterClient({ routes, reducers })
```

### Routes

```javascript
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Home from './components/home'
import About from './components/about'

let routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
  </Route>
)

export default routes
```

### Reducers

```javascript
// A sample Redux reducer
function text(state = 'Call me Ishmael.', action) {
  switch (action.type) {
    case 'UPDATE':
      return action.value
    default:
      return state
    }
}

export default {
  text
}
```
