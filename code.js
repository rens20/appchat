(function(){
    const app = document.querySelector(".app");
    const socket = io();
  
    let uname;
    app.querySelector(".join-screen #join-user").addEventListener("click",function(){
      let username = app.querySelector(".join-screen #username").value;
      if(username.length == 0){
        return;
      }
      socket.emit("user",username);
      uname = username;
      app.querySelector(".join-screen").classList.remove("active");
      app.querySelector(".chat-screen").classList.add("active");
    });
  
    app.querySelector(".chat-screen #send-message").addEventListener("click",function (){
      let messsage = app.querySelector(".chat-message #chat-input").value;
      if(message.length == 0){
        return;
      }
      renderMessage(".my",{
        username:uname,
        text:message
      });
      socket.emit("chat",{
        username:uname,
        text:message
      });
    app.querySelector(".chat-message #chat-input").value = "";
    });
  
  app.querySelector(".chat-screen #exit-chat").addEventListener("click",function (){
    socket.emit("exituser",uname);
    window.location.href = window.location.href;
  })
  
    socket.on("update",function(update){
      renderMessage("update",update);
    });
  
    socket.on("chat",function(message){
      renderMessage("other",message);
    });
    
    function renderMessage(type,message){
      let messangeContainer = app.querySelector(".chat-screen .messages");
      if(type == "my"){
        let el = document.createElement("div");
        el.setAttribute9("class","message my-message");
        el.innerHTML = `<div class="name">you</div>
        <div class="text">${message.text}</div>`;
  
  messageContainer.appendChild(el);
        
      }else if(type == "other"){
        let el = document.createElement("div");
              el.setAttribute9("class","message other-message");
              el.innerHTML = `<div class="name">${message.username}</div>
              <div class="text">${message.text}</div>`;
  
        messageContainer.appendChild(el);
      }else if(type == "update"){
        let el = document.createElement("div");
              el.setAttribute9("class","update");
              el.innerText = message;
        messageContainer.appendChild(el);
      }
      messangeContainer.scrollTop = messangeContainer.scrollHeight - messangeContainer.clientHeight;
    }
  })();