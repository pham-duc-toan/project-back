import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
//khi có import thì ko nhận được server return id , ko hiểu
var idUser = document.querySelector(".data-id").getAttribute("data-id");
const innerBody = document.querySelector(".inner-body");
if (innerBody) {
  innerBody.scrollTop = innerBody.scrollHeight;
}
console.log(idUser);

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector(".inner-form");
if (formChat) {
  const innerBody = document.querySelector(".inner-body");
  innerBody.scrollTop = innerBody.scrollHeight;
  //emoji-picker

  //show emoji in input
  const input = formChat.querySelector("input[name='content']");
  document
    .querySelector("emoji-picker")
    .addEventListener("emoji-click", (event) => {
      const cursorPosition = input.selectionStart; // Lấy vị trí con trỏ
      const emoji = event.detail.emoji.unicode; // Lấy mã unicode của emoji
      const textBeforeCursor = input.value.substring(0, cursorPosition); // Lấy phần văn bản trước con trỏ
      const textAfterCursor = input.value.substring(cursorPosition); // Lấy phần văn bản sau con trỏ

      // Cập nhật giá trị của input bằng cách thêm emoji vào vị trí con trỏ
      input.value = textBeforeCursor + emoji + textAfterCursor;

      // Cập nhật lại vị trí con trỏ
      const newCursorPosition = cursorPosition + emoji.length;
      input.setSelectionRange(newCursorPosition, newCursorPosition);

      // Focus vào input
      input.focus();
    });

  //end show emoji in input
  //show emoji when click button
  const button = document.querySelector(".button-show-tooltip");
  const tooltip = document.querySelector(".tooltip");
  tooltip.setAttribute("data-popper-placement", "top");
  Popper.createPopper(button, tooltip);
  input.addEventListener("click", () => {
    tooltip.classList.remove("shown");
  });
  button.onclick = () => {
    tooltip.classList.toggle("shown");
  };
  //end show emoji when click button
  //end emoji-picker

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
