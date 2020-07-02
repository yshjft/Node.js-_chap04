const http=require('http');

http.createServer((req, res)=>{
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
  res.write('<p>??</p>');
}).listen(8081, ()=>{
  console.log('8081번 포트에서 서버가 대기 중입니다');
});

//The server.listen() method creates a listener on the specified port or path.

