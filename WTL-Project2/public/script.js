fetch("/youtubers")
  .then((res) => res.json())
  .then((data) => {
    Object.entries(data).forEach(([id, youtuber]) => {
      const newDiv = document.createElement("div");
      newDiv.className = "card"; //유튜버 하나 카드의 class 이름
      let isSubscribed = false; //구독 유무

      newDiv.innerHTML = `
      <div class="delBtnDiv"> <button class="deleteButton" data-id="${id}"></button><br><br> </div>
      <img src="${youtuber.image}" class="profileImage" />
      <div class="channelTitle"><h3><b>${youtuber.channelTitle}</b></h3></div>
      <div class="subs">구독자: ${youtuber.subscribers}명</div>
      <div>영상 수: ${youtuber.videoNum}개</div>
      <button class="subButton" data-id="${id}">구독</button>
        `;

      const subDiv = newDiv.querySelector(".subs");
      const subBtn = newDiv.querySelector(".subButton");
      subBtn.addEventListener("click", () => {
        if (isSubscribed) {
          // 구독 중 -> 구독 취소
          youtuber.subscribers--;
          subBtn.textContent = "구독";
          subBtn.classList.remove("subscribed");
          isSubscribed = false;
          fetch(`/youtuber/${id}`, {
            method: "PUT",
          })
            .then((res) => res.json())
            .then((data) => {});
        } else {
          // 구독 안 함 -> 구독하기
          youtuber.subscribers++;
          subBtn.textContent = "구독 중";
          subBtn.classList.add("subscribed");
          isSubscribed = true;
        }

        subDiv.textContent = `구독자: ${youtuber.subscribers}명`;
      });

      const deleteBtn = newDiv.querySelector(".deleteButton");
      deleteBtn.addEventListener("click", () => {
        fetch(`/youtuber/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            newDiv.remove(); //카드 DOM에서 제거
            location.reload(); // 새로고침하여 목록에 추가된 유튜버 보이게
          });
      });

      document.getElementById("cards").appendChild(newDiv);
    });
  });

document.getElementById("addButton").addEventListener("click", () => {
  let popup = document.getElementById("popup");
  popup.classList.remove("hidden");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  let popup = document.getElementById("popup");
  popup.classList.add("hidden");
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const channelTitle = document.getElementById("channelTitle").value;
  const image = document.getElementById("imageURL").value;

  if (!channelTitle || !image) {
    alert("모든 항목을 입력하세요.");
    return;
  }

  fetch("/youtuber", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channelTitle, image }),
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload(); // 새로고침하여 목록에 추가된 유튜버 보이게
    });
  let popup = document.getElementById("popup");
  popup.classList.remove("hidden");
});
