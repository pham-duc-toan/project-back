var idUser;
const innerBody = document.querySelector(".inner-body");
if (innerBody) {
  innerBody.scrollTop = innerBody.scrollHeight;
}
//SERVER_RETURN_ID
socket.on("SERVER_RETURN_ID", (id) => {
  idUser = id;
  console.log(idUser);
});
//END SERVER_RETURN_ID

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector(".inner-form");
if (formChat) {
  formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = formChat.querySelector("input");
    const content = input.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      input.value = "";
    }
  });
}
// end CLIENT_SEND_MESSAGE
//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const div = document.createElement("div");

  if (data.idSendMess != idUser) {
    div.classList.add("inner-incoming");
    div.innerHTML = `
    <div class="inner-name">${data.fullName}<div>
    <div class="inner-content">${data.content}<div>
  `;
  } else {
    div.classList.add("inner-outgoing");
    div.innerHTML = `
    <div class="inner-content">${data.content}<div>
  `;
  }

  innerBody.appendChild(div);

  innerBody.scrollTop = innerBody.scrollHeight;
});
//end SERVER_RETURN_MESSAGE
