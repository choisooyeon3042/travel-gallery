import { galleryItems } from "/js/modal_contents.js";

// header 스크롤시 header fixed add
window.addEventListener("scroll", function(event) {
    let header = document.querySelector("header");
    let scrollY = window.scrollY;

    if (scrollY > 85) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});

// 스크롤시 progressbar
document.addEventListener("scroll", function(event) {
    const progressBar = document.getElementById("progress_bar");

    window.addEventListener("scroll", function(event) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const bar = (window.scrollY / scrollHeight) * 100;

      progressBar.style.width = bar + "%";
    });
});

//갤러리 리스트
const galleryList = document.querySelector("ul.gallery_list");

if (galleryList) {
    galleryItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.setAttribute("data-modal", item.modalId);

        listItem.innerHTML = `
            <div class="img">
              <img src="${item.img}" alt="${item.alt}">
            </div>
            <div class="info_box">
              <div class="tag_list">
                ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
              </div>
              <h4>${item.title}</h4>
            </div>
        `;
        galleryList.appendChild(listItem);
    });
}

// 갤러리 모달
galleryItems.forEach((data) => {
    const tagListHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
    const modalTemplate = `
         <div class="modal_wrapper hide" id="${data.modalId}">
            <div class="modal_overlay"></div>
            <div class="modal_contents">
                <div class="modal_header">
                    <button class="close_btn"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal_body">
                    <div class="img_box">
                        <img src="${data.img}" alt="${data.alt}">
                    </div>
                    <div class="info_box">
                       <h4>${data.title}</h4>
                       <div class="tag_list">
                            ${tagListHTML}
                       </div>
                   </div>
                </div>
            </div>
        </div>
    `;
    // HTML 마크업 파싱, 요소 노드의 자식 노드로 DOM 추가
    document.body.insertAdjacentHTML("beforeend", modalTemplate);
});

document.querySelector(".gallery_list").addEventListener('click', function(event){
    const item = event.target.closest("li");

    if (item) {
        const modalId = item.getAttribute("data-modal");
        const modal = document.querySelector(`#${modalId}`);

       if (modal) {
           modal.classList.remove("hide");
           document.body.style.overflow = "hidden";

           const closBtn = modal.querySelectorAll(".modal_overlay, .close_btn");
           closBtn.forEach(btn => {
               btn.addEventListener('click', function() {
                   modal.classList.add("hide");
                   document.body.style.overflow = "auto";
               });
           });
           /**/

       } else {
           alert("모달 존재 X");
       }
    }
});
