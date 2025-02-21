import { galleryItems, modalThumbnails } from "./modal_contents.js";

// header 스크롤시 header fixed add
window.addEventListener("scroll", () => {
    let header = document.querySelector("header");
    let scrollY = window.scrollY;

    if (scrollY > 85) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});

// 스크롤시 progressbar
window.addEventListener("scroll", () => {
    const progressBar = document.getElementById("progress_bar");

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const bar = (window.scrollY / scrollHeight) * 100;

    progressBar.style.width = bar + "%";
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
            <div class="modal_contents gallery_modal_contents">
                <div class="detail_inner">
                    <div class="modal_header">
                        <button class="close_btn"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="modal_body gallery_modal_body">
                        <div class="left_contents">
                            <div class="img_box">
                                <img src="${data.img}" alt="${data.alt}">
                            </div>
                        </div>
                        <div class="info_box">
                           <h4>${data.title}</h4>
                           <div class="tag_list">
                                ${tagListHTML}
                           </div>
                        </div>
                    </div>
                </div>
                <ul class="thumbnail_list"></ul>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalTemplate);
    generateThumbnailList(data.modalId);
});

// 썸네일 목록을 동적으로 생성
function generateThumbnailList(modalId) {
    const thumbnailContainer = document.querySelector(`#${modalId} .thumbnail_list`);
    const thumbnails = modalThumbnails[modalId];

    if (thumbnails) {
        thumbnailContainer.innerHTML = thumbnails.map(item => `
            <li class="thumb_item">
                <img src="${item.thumbImg}" alt="${item.thumbAlt}" data-modal="${modalId}">
            </li>
        `).join('');
    }
}

document.querySelector(".gallery_list").addEventListener("click", (e) => {
    const item = e.target.closest("li");

    if (item) {
        const modalId = item.getAttribute("data-modal");
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            // 모든 모달을 숨기고 첫 번째 썸네일에 active 클래스 추가
            const allModal = document.querySelectorAll(".modal_wrapper");
            allModal.forEach(modal => {
                modal.classList.add("hide");
                const allThumbnail = modal.querySelectorAll(".thumb_item img");
                allThumbnail.forEach(img => {
                    img.classList.remove("active");
                });
            });

            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";

            const firstThumbnail = modal.querySelector(".thumbnail_list .thumb_item img:first-child");
            const modalImg = modal.querySelector(".modal_body .img_box img");

            if (firstThumbnail) {
                modalImg.src = firstThumbnail.src; // 모달 이미지를 첫 번째 썸네일 이미지로 초기화
                modalImg.alt = firstThumbnail.alt;
                firstThumbnail.classList.add("active");
            }

            const closeBtn = modal.querySelectorAll(".modal_overlay, .close_btn");
            closeBtn.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    modal.classList.add("hide");
                    document.body.style.overflow = "auto";
                });
            });

            // 썸네일 리스트 클릭 시 이미지 교체
            const thumbnailList = modal.querySelector(".thumbnail_list");

            thumbnailList.addEventListener("click", (e) => {
                const thumbnail = e.target.closest(".thumb_item img");
                if (thumbnail) {
                    const modalImg = modal.querySelector(".modal_body .img_box img");
                    if (modalImg) {
                        modalImg.src = thumbnail.src;
                        modalImg.alt = thumbnail.alt;
                    }

                    const allThumbnail = modal.querySelectorAll(".thumb_item img");
                    allThumbnail.forEach(img => {
                        img.classList.remove("active");
                    });

                    thumbnail.classList.add("active");
                }
            });
        } else {
            alert("모달 존재 X");
        }
    }
});
