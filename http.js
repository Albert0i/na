const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req.url)
    if (req.url === '/') {
      res.end('Home page')
    }
    else
    if (req.url === '/about') {
      console.time()
      for (let i=0; i< 1000; i++)
        for (let j=0; j < 1000; j++)
            console.log(`i=${i}, j=${j}`)
      console.timeEnd()
      res.end('About page')
    }
    else
    res.end('Error page')
})

server.listen(5000)