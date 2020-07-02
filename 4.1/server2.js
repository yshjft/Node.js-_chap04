const http = require('http');
const fs = require('fs');

const server2 = http.createServer((req, res)=>{
  fs.readFile('./server2.html', (error, data)=>{
    if(error){
      throw error;
    }
    res.end(data);
  })
})

server2.listen(8081);
server2.on('listening', ()=>{
  console.log('8081번 포트에서 서버 대기 중입니다.');
});
server2.on('error', (error)=>{
  console.error(error);
});