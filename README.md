Simple Express.js router middleware for sites that use React Router.

### Server

```javascript
import express from 'express'
import RouterServer from 'react-router-router/server'
import routes from './routes'

let app = express()
let router = RouterServer(routes);

app.set('port', (process.env.PORT || 5000))

// The page will look for a JavaScript file at `main.js`.
// I’m webpacking the client script to `public/main.js` and using the `public/` directory for static assets
app.use(express.static(process.env.PWD + '/public'))
app.use('/', router);

app.listen(app.get('port'), function () {
	console.log('Listening at port', app.get('port'));
});

```

### Client

```javascript
import RouterClient from 'react-router-router/client'
import routes from './routes'

RouterClient(routes)

```

### Routes

```javascript
import Home from './components/home';

export default {
	path: '/',
	component: Home
}
```
