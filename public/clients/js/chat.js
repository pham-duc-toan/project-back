import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
//khi có import thì ko nhận được server return id , ko hiểu
var idUser = document.querySelector(".data-id").getAttribute("data-id");

const innerBody = document.querySelector(".inner-body");
if (innerBody) {
  innerBody.scrollTop = innerBody.scrollHeight;
  // viewer fullscreen
  const gallery = new Viewer(innerBody);
  // end viewer fullscreen
}
var timeOut;

const formChat = document.querySelector(".inner-form");
if (formChat) {
  innerBody.scrollTop = innerBody.scrollHeight;
  //EMOJI-PICKER------------------------------------------------------------------------------------------------------/\

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
      //3 dong de chen typing
      socket.emit("CLIENT_SEND_TYPING", "show");
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
      }, 3000);
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
  //END EMOJI-PICKER------------------------------------------------------------------------------------------------------\/

  //typing-----------------------------------------------------------------------------------------------------------------/\

  const innerListTyping = document.querySelector(".inner-list-typing");
  if (innerListTyping) {
    input.addEventListener("keyup", () => {
      socket.emit("CLIENT_SEND_TYPING", "show");
      //tác dụng của socket trường hợp này là để gửi tới mọi người khác cùng js để render ra typing
      clearTimeout(timeOut);
      // vấn đề là xóa timeOut nhưng chưa chắc timeOut này đã trùng với idUser. ví dụ : A là người typing, thì B gõ keyup, B trở thành người typing cùng A, nhưng tự dưng lại xóa cái hẹn giờ tắt của A đi và hẹn giờ tắt cho B
      timeOut = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
      }, 3000);
    });

    socket.on("SERVER_RETURN_TYPING", (data) => {
      if (data.type == "show") {
        const exitTyping = innerListTyping.querySelector(
          `[user-id="${data.userId}"]`
        );
        if (!exitTyping) {
          const boxTyping = document.createElement("div");
          boxTyping.classList.add("box-typing");
          boxTyping.setAttribute("user-id", data.userId);
          boxTyping.innerHTML = `
          <div class="inner-name">
            ${data.fullName}
          </div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        `;
          innerListTyping.appendChild(boxTyping);
          innerBody.scrollTop = innerBody.scrollHeight;
        }
      } else {
        const exitTyping = innerListTyping.querySelector(
          `[user-id="${data.userId}"]`
        );
        innerListTyping.removeChild(exitTyping);
      }
    });
    //xóa hoặc render typing
  }
  //end typing-----------------------------------------------------------------------------------------------------------\/

  // CLIENT_SEND_MESSAGE------------------------------------------------------------------------------------------------/\
  const upload = new FileUploadWithPreview.FileUploadWithPreview(
    "upload-images",
    {
      multiple: true,
      maxFileCount: 6,
    }
  );
  formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = formChat.querySelector("input");
    const content = e.target.elements.content.value;
    const images = upload.cachedFileArray || [];
    if (content || images.length > 0) {
      const data = {
        content: content,
        images: images,
      };

      socket.emit("CLIENT_SEND_MESSAGE", data);
      input.value = "";
      upload.resetPreviewPanel();
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
// end CLIENT_SEND_MESSAGE------------------------------------------------------------------------------------------------\/
//SERVER_RETURN_MESSAGE------------------------------------------------------------------------------------------------/\
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const div = document.createElement("div");
  const innerListTyping = document.querySelector(".inner-list-typing");
  if (data.idSendMess != idUser) {
    div.classList.add("inner-incoming");
    div.innerHTML = `
    <div class="inner-name">${data.fullName}<div>
  `;
  } else {
    div.classList.add("inner-outgoing");
  }
  let images = "";
  let content = "";
  if (data.images.length > 0) {
    let imgs = "";
    data.images.forEach((ele) => {
      imgs += `
      <img src='${ele}'>
      `;
    });
    images = `<div class="inner-images">${imgs}</div>`;
  }
  if (data.content) {
    content = `<div class="inner-content">${data.content}</div>`;
  }

  div.innerHTML += `
    ${content}
    ${images}  
  `;

  innerBody.insertBefore(div, innerListTyping);

  const gallery = new Viewer(div.querySelector(".inner-images"));
  innerBody.scrollTop = innerBody.scrollHeight;
});
//end SERVER_RETURN_MESSAGE----------------------------------------------------------------------------------------------\/
