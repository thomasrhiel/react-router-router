Simple Express.js router middleware for sites that use React Router.

### Server

```javascript
import express from 'express'
import RouterServer from 'react-router-router/server'
import routes from './routes'
import store from './store' // Redux store. This is optional.

let app = express()
let router = RouterServer(routes, store)

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
import store from './store' // Redux store. This is optional.

RouterClient(routes, store)
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

### Store

```javascript
import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// A sample Redux reducer
function text(state = 'Call me Ishmael') {

  /*
   * Normally, a switch statement would go here,
   * allowing you to update the state with dispatched actions. 
   * For the purposes of this example, I'm simply
   * returning the state.
   */

  return state
}

export default createStore(combineReducers({
  text,
  routing: routerReducer
}))
```
