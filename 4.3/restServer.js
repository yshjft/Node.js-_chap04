const http=require('http');
const fs=require('fs');

const users={};

http.createServer((req, res)=>{
  if(req.method=='GET'){
    if(req.url==='/'){
      //return 사용
      return fs.readFile('./restFront.html', (err, data)=>{
        if(err){
          throw err; //throw 문은 사용자 정의 예외를 던질 수 있다. 현재 함수의 실행이 중지된다.
        }
        res.end(data);
      });
    }else if(req.url ==='/about'){
      //return 사용
      return fs.readFile('./about.html', (err, data)=>{
        if(err){
          throw err;  //throw 문은 사용자 정의 예외를 던질 수 있다. 현재 함수의 실행이 중지된다.
        }
        res.end(data);
      });
    }else if(req.url === '/users'){//등록 명단 제공
      return res.end(JSON.stringify(users)); //JSON.stringify(객체) : JavaScript 값이나 객체를 JSON 문자열로 변환한다.
    }
    return fs.readFile(`.${req.url}`, (err, data)=>{ //기타 정적파일 제공
      if(err){
        res.writeHead(404, 'NOT FOUND');
        return res.end('NOT FOUND');
      }
      return res.end(data);
    });
  }else if(req.method === 'POST'){ // POST : 새로운 데이터 등록
    if(req.url === '/users'){
      let body='';
      req.on('data', (data)=>{ //readstram
        body+=data;
      });
      return req.on('end', ()=>{ //readstram
        console.log('POST 본문(Body):', body);
        const {name} = JSON.parse(body); //JSON.parse(json) : 메서드는 JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성한다.
        const id= +new Date(); //+ 연산자는 개체를 숫자로 변환하는 역할이다. 현재 시간을 millisecond 로 가져온다.
        users[id] = name; //객체 형태로 저장(?). ex: {'id':'name'}
        res.writeHead(201);
        res.end('등록성공');
      });
    }
  }else if(req.method === 'PUT'){ // PUT : (전체)수정 요청
    if(req.url.startsWith('/users/')){ //startsWith(문자열) : 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true 혹은 false로 반환한다.
      const key=req.url.split('/')[2];//split('/') 실행 시 [ '', 'users', 'id' ]
      let body='';
      req.on('data', (data)=>{ //readstram
        body+=data;
      });
      return req.on('end', ()=>{ //readstram
        console.log('PUT 본문(Body):', body);
        users[key]=JSON.parse(body).name; //JSON.parse(json) : 메서드는 JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성한다.
        return res.end(JSON.stringify(users));
      });
    }
  }else if(req.method === 'DELETE'){
    if(req.url.startsWith('/users/')){
      const key=req.url.split('/')[2];
      delete users[key]; //delete : 객체의 속성을 제거
      return res.end(JSON.stringify(users));
    }
  }
  res.writeHead(404, 'NOT FOUND');
  return res.end('NOT FOUND');
}).listen(8085, ()=>{
  console.log('8085번 포트에서 서버 대기중입니다');
});