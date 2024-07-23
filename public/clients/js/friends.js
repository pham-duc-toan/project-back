//lấy id
const myId = document.querySelector("[myId]").getAttribute("myId");

//bắt sự kiện cho button add friend
const btnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (btnAddFriend) {
  btnAddFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userTarget = btn.getAttribute("btn-add-friend");
      btn.closest(".box-user").classList.add("add");
      socket.emit("CLIENT_SEND_REQUEST_ADD_FRIEND", {
        userTarget,
      });
    });
  });
}
//cập nhật giao diện cho người nhận
socket.on("UPDATE_DISPLAY_AFTER_REQUEST_ADD", (data) => {
  const { nguoigui, nguoinhan, nguoiguiInfo, nguoinhanInfo } = data;
  if (nguoinhan == myId) {
    const pageSuggestFriend = document.querySelector("[page-suggest-friend]");
    if (pageSuggestFriend) {
      const boxUserDelele = document.querySelector(
        `[box-user-id="${nguoigui}"]`
      );
      boxUserDelele.remove();
    }
    const pageRequestToMe = document.querySelector("[page-request-to-me]");
    if (pageRequestToMe) {
      const newBoxUser = document.createElement("div");
      newBoxUser.classList.add("col-6");
      newBoxUser.setAttribute("box-user-id", `${nguoigui}`);
      let avatar = nguoiguiInfo.avatar
        ? nguoiguiInfo.avatar
        : "/clients/images/avt-user.png";
      newBoxUser.innerHTML = `
          <div class="box-user add">
            <div class="inner-avatar">
                <img 
                    src="${avatar}" 
                    alt="${nguoiguiInfo.fullName}"
                >
            </div>
            <div class="inner-info">
              <div class="inner-name">${nguoiguiInfo.fullName}</div>
              <div class="inner-buttons">
                  <button
                      class="btn btn-sm btn-primary mr-1"
                      btn-accept-friend="${nguoiguiInfo.id}"
                  >
                      Chấp nhận
                  </button>
                  <button
                      class="btn btn-sm btn-secondary mr-1"
                      btn-refuse-friend="${nguoiguiInfo.id}"
                  >
                      Xóa
                  </button>
                  <button
                      class="btn btn-sm btn-secondary mr-1"
                      btn-deleted-friend
                      disabled
                  >
                      Đã xóa
                  </button>
                  <button
                      class="btn btn-sm btn-primary mr-1"
                      btn-accepted-friend
                      disabled
                  >
                      Đã chấp nhận
                  </button>
              </div>
            </div>

          </div>  `;
      pageRequestToMe.appendChild(newBoxUser);
    }
  }
});
const pageListFriend = document.querySelector("[page-list-friends]");
if (pageListFriend) {
}
//bắt sự kiện cho button cancel add
const btnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (btnCancelFriend) {
  btnCancelFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userTarget = btn.getAttribute("btn-cancel-friend");
      btn.closest(".box-user").classList.remove("add");
      socket.emit("CLIENT_CANCEL_REQUEST_ADD_FRIEND", {
        userTarget,
      });
    });
  });
}
//cập nhật giao diện cho người nhận
socket.on("UPDATE_DISPLAY_AFTER_CANCEL_ADD", (data) => {
  const { nguoigui, nguoinhan, nguoiguiInfo, nguoinhanInfo } = data;
  if (nguoinhan == myId) {
    const pageRequestToMe = document.querySelector("[page-request-to-me]");
    if (pageRequestToMe) {
      const boxUserDelele = document.querySelector(
        `[box-user-id="${nguoigui}"]`
      );
      boxUserDelele.remove();
    }
    const pageSuggestFriend = document.querySelector("[page-suggest-friend]");
    if (pageSuggestFriend) {
      const newBoxUser = document.createElement("div");
      newBoxUser.classList.add("col-6");
      newBoxUser.setAttribute("box-user-id", `${nguoigui}`);
      let avatar = nguoiguiInfo.avatar
        ? nguoiguiInfo.avatar
        : "/clients/images/avt-user.png";
      newBoxUser.innerHTML = `
          <div class="box-user">
            <div class="inner-avatar">
                <img 
                    src="${avatar}" 
                    alt="${nguoiguiInfo.fullName}"
                >
            </div>
            <div class="inner-info">
              <div class="inner-name">${nguoiguiInfo.fullName}</div>
              <div class="inner-buttons">
                  <button
                      class="btn btn-sm btn-primary mr-1"
                      btn-add-friend="${nguoiguiInfo.id}"
                  >
                      Kết bạn
                  </button>
                  <button
                      class="btn btn-sm btn-secondary mr-1"
                      btn-cancel-friend="${nguoiguiInfo.id}"
                  >
                      Hủy
                  </button>
                  
              </div>
            </div>

          </div>  `;
      pageSuggestFriend.appendChild(newBoxUser);
      const btnAddNew = newBoxUser.querySelector("[btn-add-friend]");
      const btnCancelNew = newBoxUser.querySelector("[btn-cancel-friend]");
      // btnAddNew.addEventListener("click", () => {
      //   const userTarget = btnAddNew.getAttribute("btn-add-friend");
      //   btnAddNew.closest(".box-user").classList.add("add");
      //   socket.emit("CLIENT_SEND_REQUEST_ADD_FRIEND", {
      //     userTarget,
      //   });
      // });
      // btnCancelNew.addEventListener("click", () => {
      //   const userTarget = btnCancelNew.getAttribute("btn-cancel-friend");
      //   btnCancelNew.closest(".box-user").classList.remove("add");
      //   socket.emit("CLIENT_CANCEL_REQUEST_ADD_FRIEND", {
      //     userTarget,
      //   });
      // });
    }
  }
});
