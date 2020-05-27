const proxy = require('http-proxy-middleware');

// Setup proxy to host api and static image files from node server
module.exports = function (app) {

  app.use('/images', proxy({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }))

  app.use('/api', proxy({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }))
 
}
