const express = require('express')
const http = require('http')
const router = express()
const { createWebAPIRequest } = require('../util/util')

router.get('/', (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const id = parseInt(req.query.id)
  const options = {  
    hostname: 'music.163.com',  
    port: 80,  
    path: "/api/song/detail/?id="+id+"&ids=["+id+"]",  
    method: 'GET'  
}; 
  
  _songDetail(
    options,
    music_req => {
      res.send(music_req)
    },
    err => res.status(502).send('fetch error')
  )

  
})

function _songDetail(options,callback,errorcallback){
          let music_req = '';
          const http_client = http.request(options, function (res) {  
                    res.on('error', function(err) {
                      errorcallback(err)
                      })
                    res.setEncoding('utf8')
                    if (res.statusCode != 200) {
                        _songDetail(options,callback,errorcallback)
                        return
                    } else {
                      res.on('data', function(chunk) {
                                music_req += chunk
                    })
                  res.on('end', function() {
                  if (music_req == '') {
                            _songDetail(options,callback,errorcallback)
                          return
                        }
                  if (res.headers['set-cookie']) {
                          callback(music_req, res.headers['set-cookie'])
                    } else {
                          callback(music_req)
                      }
                  })
                }
            });  
       http_client.end();
}
module.exports = router

