function getUser(){ // 로딩시 사용자가 가져오는 함수
  var xhr= new XMLHttpRequest();
  xhr.onload=function(){
    if(xhr.status==200){
      //JSON.parse(json) : JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성합니다. 
      var users=JSON.parse(xhr.responseText); //xhr.responseText : 성공한 내용이 들어 있다. 
      var list=document.getElementById('list');
      list.innerHTML='';

      Object.keys(users).map(function(key){
        //Object.keys(객체) : Object 에 속한 key를 배열 형태로 가져올 수 있다
        //map(callback 함수) : 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.

        var userDiv=document.createElement('div');
        var span= document.createElement('span');
        span.textContent=users[key];
        var edit = document.createElement('button');
        edit.textContent='수정'; //textContent : Set the text content of a node
        edit.addEventListener('click', ()=>{
          var name=prompt('바꿀 이름을 입력하세요');
          if(!name){
            return alert('이름을 반드시 입력하셔야 합니다');
          }
          var xhr=new XMLHttpRequest();
          xhr.onload = function(){
            if(xhr.status===200){
              console.log(xhr.responseText);
              getUser(); //수정한 이후 화면 다시 loading
            }else{
              console.log(xhr.responseText);
            }
          };
          xhr.open('PUT', '/users/'+key);
          xhr.setRequestHeader('Content-Type', 'application/json'); //서버로 보내는 컨텐츠가 JSON 형식임을 알림
          xhr.send(JSON.stringify({name: name})); //JSON.stringify(객체) : JavaScript 값이나 객체를 JSON 문자열로 변환한다. 
        });
        var remove=document.createElement('button');
        remove.textContent='삭제';
        remove.addEventListener('click', ()=>{
          var xhr= new XMLHttpRequest();
          xhr.onload=function(){
            if(xhr.status===200){
              console.log(xhr.responseText);
              getUser(); //항목 삭제 후 화면 다시 loading
            }else{
              console.log(xhr.responseText);
            }
          };
          xhr.open('DELETE', '/users/'+key);
          xhr.send();
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
      });

    }else{
      console.error(xhr.responseText); //에러 메시지가 들어있다.
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}

//로딩 시 getUser 호출
window.onload=getUser; //onload : 문서의 모든 콘텐츠(images, script, css...)가 로드된 후 발생하는 이벤트이다(load 이벤트라고들 한다).

document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault(); //이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다.
  var name=e.target.username.value;
  if(!name){
    return alert('이름을 입력하세요');
  }
  var xhr = new XMLHttpRequest();
  xhr.onload=function(){
    if(xhr.status === 201){
      console.log(xhr.responseText);
      getUser();
    }else{
      console.log(xhr.responseText);
    }
  };
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json'); //서버로 보내는 컨텐츠가 JSON 형식임을 알림
  xhr.send(JSON.stringify({name:name})); //데이터를 동봉해 전송
  e.target.username.value='';
});