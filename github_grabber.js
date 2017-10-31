const fs = require('fs');
const qs = require('querystring');
const http = require('http');
const https = require('https');

const options = {
  hostname: 'api.github.com/users/jastack'
};

const reqOne = https.request(options, resp => {
  this.setHeader('User-Agent','jastack');
  console.log(resp);
});

reqOne.on('error', e => {
  console.log(e);
});

reqOne.end();

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST'){
    let body = '';
    req.on('data', d => {
      body +=d;
    }).on('end', () => {
      const username = qs.parse(body).username;
      console.log(username);
      res.end(username);
    });
  }
});

githubServer.listen(8080, () => console.log('Listening on 8080'));
