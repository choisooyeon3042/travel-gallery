// 새로고침 스크롤 위치 복원 안함
//if (history.scrollRestoration) {
//  history.scrollRestoration = "manual";
//}


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

// 모달
document.querySelectorAll(".gallery_list > li").forEach(item => {
    item.addEventListener("click", function(event) {
        const modalId = item.getAttribute("data-modal");
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";

            const closeBtn = modal.querySelectorAll(".modal_overlay, .modal_header button");
             closeBtn.forEach(closeButton => {
                closeButton.addEventListener("click", function(event) {
                    modal.classList.add("hide");
                    document.body.style.overflow = "auto";
                });
            });
        } else {
            alert("모달 존재 X");
        }
    });
});

const gallery = [
    {id:1, img: "../img/croatia_1.jpg", alt: "크로아티아 이미지"},
    {id:2, img: "../img/swiss_1.jpg", alt: "스위스 이미지"},
    {id:3, img: "../img/austria_1.jpg", alt: "오스트리아 이미지"},
    {id:4, img: "../img/por_1.jpg", alt: "포르투갈 이미지"},
    {id:5, img: "../img/egypt_1.jpg", alt: "이집트 이미지"},
    {id:6, img: "../img/united_1.jpg", alt: "영국 이미지"},
    {id:7, img: "../img/spain_1.jpg", alt: "스페인 이미지"},
    {id:8, img: "../img/canada_1.jpg", alt: "캐나다 이미지"},
    {id:9, img: "../img/newyork_1.jpg", alt: "뉴욕 이미지"},
];

gallery.forEach((data) => {
    const modalTemplate = `
         <div class="modal_wrapper hide" id="modal_${data.id}">
            <div class="modal_overlay"></div>
            <div class="modal_contents">
                <div class="modal_header">
                    <button><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal_body">
                    <div class="img_box">
                        <img src="${data.img}" alt="${data.alt}">
                    </div>
                </div>
            </div>
        </div>
    `;
    // HTML 마크업 파싱, 요소 노드의 자식 노드로 DOM 추가
    document.body.insertAdjacentHTML("beforeend", modalTemplate);
});


