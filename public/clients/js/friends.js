//lấy id
const myId = document.querySelector("[myId]").getAttribute("myId");

//WHEN ADD
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
//cập nhật giao diện cho người nhận KHI ADD
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
      // const btnAcceptNew = newBoxUser.querySelector("[btn-accept-friend]");
      // btnAcceptNew.addEventListener("click", () => {
      //   const userTarget = btnAcceptNew.getAttribute("btn-accept-friend");
      //   btnAcceptNew.closest(".box-user").classList.add("accepted");
      //   socket.emit("CLIENT_SEND_ACCEPT_REQUEST", {
      //     userTarget,
      //   });
      // });
      // const btnRefuseNew = newBoxUser.querySelector("[btn-refuse-friend]");
      // btnRefuseNew.addEventListener("click", () => {
      //   const userTarget = btnRefuseNew.getAttribute("btn-refuse-friend");
      //   btnRefuseNew.closest(".box-user").classList.add("refuse");
      //   socket.emit("CLIENT_SEND_REFUSE_REQUEST", {
      //     userTarget,
      //   });
      // });
    }
  }
});

//WHEN CANCEL
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
//cập nhật giao diện cho người nhận KHI CANCEL
socket.on("UPDATE_DISPLAY_AFTER_CANCEL_ADD", (data) => {
  const { nguoigui, nguoinhan, nguoiguiInfo, nguoinhanInfo } = data;
  if (nguoinhan == myId) {
    const pageRequestToMe = document.querySelector("[page-request-to-me]");
    if (pageRequestToMe) {
      const boxUserDelele = document.querySelectorAll(
        `[box-user-id="${nguoigui}"]`
      );
      boxUserDelele.forEach((element) => {
        element.remove();
      });
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
//WHEN ACCEPT
const btnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (btnAcceptFriend) {
  btnAcceptFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userTarget = btn.getAttribute("btn-accept-friend");
      btn.closest(".box-user").classList.add("accepted");
      socket.emit("CLIENT_SEND_ACCEPT_REQUEST", {
        userTarget,
      });
    });
  });
}
//cập nhật giao diện cho người nhận KHI ACCEPT
socket.on("UPDATE_DISPLAY_AFTER_ACCEPT", (data) => {
  const { nguoigui, nguoinhan } = data;
  if (nguoinhan._id == myId) {
    const pageListFriend = document.querySelector("[page-list-friends]");
    if (pageListFriend) {
      const newBoxUser = document.createElement("div");
      newBoxUser.setAttribute("box-user-id", `${nguoigui._id}`);
      newBoxUser.classList.add("col-6");
      newBoxUser.innerHTML = `
      <div class="box-user">
        <div class="inner-avatar">
            <img src="${
              nguoigui.avatar ? nguoigui.avatar : "/clients/images/avt-user.png"
            }" alt="${nguoigui.fullName}">
        </div>
        <div class="inner-info">
            <div class="inner-name">${nguoigui.fullName}</div>
            <div class="inner-buttons">
                <button class="btn btn-sm btn-primary mr-1" chat-with-other="${
                  nguoigui._id
                }">Nhắn tin</button>
            </div>
        </div>
      </div>

      `;
      pageListFriend.appendChild(newBoxUser);
    }

    const pageRequestFromMe = document.querySelector("[page-request-from-me]");
    if (pageRequestFromMe) {
      const boxUserDelele = pageRequestFromMe.querySelector(
        `[box-user-id="${nguoigui._id}"]`
      );
      boxUserDelele.remove();
    }
  }
});
//WHEN REFUSE
const btnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (btnRefuseFriend) {
  btnRefuseFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userTarget = btn.getAttribute("btn-refuse-friend");
      btn.closest(".box-user").classList.add("refuse");
      socket.emit("CLIENT_SEND_REFUSE_REQUEST", {
        userTarget,
      });
    });
  });
}
//cập nhật giao diện cho người nhận KHI REFUSE
socket.on("UPDATE_DISPLAY_AFTER_REFUSE", (data) => {
  const { nguoigui, nguoinhan } = data;

  if (nguoinhan._id == myId) {
    const pageSuggestFriend = document.querySelector("[page-suggest-friend]");
    if (pageSuggestFriend) {
      const existBoxUser = document.querySelector(
        `[box-user-id='${nguoigui._id}']`
      );
      if (!existBoxUser) {
        const newBoxUser = document.createElement("div");
        newBoxUser.classList.add("col-6");
        newBoxUser.setAttribute("box-user-id", `${nguoigui._id}`);
        let avatar = nguoigui.avatar
          ? nguoigui.avatar
          : "/clients/images/avt-user.png";
        newBoxUser.innerHTML = `
          <div class="box-user">
            <div class="inner-avatar">
                <img 
                    src="${avatar}" 
                    alt="${nguoigui.fullName}"
                >
            </div>
            <div class="inner-info">
              <div class="inner-name">${nguoigui.fullName}</div>
              <div class="inner-buttons">
                  <button
                      class="btn btn-sm btn-primary mr-1"
                      btn-add-friend="${nguoigui._id}"
                  >
                      Kết bạn
                  </button>
                  <button
                      class="btn btn-sm btn-secondary mr-1"
                      btn-cancel-friend="${nguoigui._id}"
                  >
                      Hủy
                  </button>
                  
              </div>
            </div>

          </div>  `;
        pageSuggestFriend.appendChild(newBoxUser);
        const btnAddNew = newBoxUser.querySelector("[btn-add-friend]");
        const btnCancelNew = newBoxUser.querySelector("[btn-cancel-friend]");
        btnAddNew.addEventListener("click", () => {
          const userTarget = btnAddNew.getAttribute("btn-add-friend");
          btnAddNew.closest(".box-user").classList.add("add");
          socket.emit("CLIENT_SEND_REQUEST_ADD_FRIEND", {
            userTarget,
          });
        });
        btnCancelNew.addEventListener("click", () => {
          const userTarget = btnCancelNew.getAttribute("btn-cancel-friend");
          btnCancelNew.closest(".box-user").classList.remove("add");
          socket.emit("CLIENT_CANCEL_REQUEST_ADD_FRIEND", {
            userTarget,
          });
        });
      } else {
        const deletedAttributeAdd = existBoxUser.querySelector(".box-user");
        deletedAttributeAdd.classList.remove("add");
      }
    }
    const pageRequestFromMe = document.querySelector("[page-request-from-me]");
    if (pageRequestFromMe) {
      const boxUserDelele = pageRequestFromMe.querySelector(
        `[box-user-id='${nguoigui._id}']`
      );
      boxUserDelele.remove();
    }
  }
});
