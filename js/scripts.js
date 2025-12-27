document.querySelectorAll(".mega-left .nav-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    // HAPUS ACTIVE DI SEMUA MENU KIRI
    document
      .querySelectorAll(".mega-left .nav-link")
      .forEach((el) => el.classList.remove("active"));

    // HAPUS ACTIVE DI SEMUA TAB
    document
      .querySelectorAll(".mega-right .tab-pane")
      .forEach((tab) => tab.classList.remove("show", "active"));

    // AKTIFKAN MENU YANG DI HOVER
    this.classList.add("active");

    // AMBIL TARGET TAB
    const target = this.getAttribute("href");
    const tabPane = document.querySelector(target);

    if (tabPane) {
      tabPane.classList.add("show", "active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("flashSaleTrack");
  const items = document.querySelectorAll(".flash-item");
  const visible = 4;
  let index = 0;

  // CLONE AWAL & AKHIR (BIAR LOOP)
  for (let i = 0; i < visible; i++) {
    track.appendChild(items[i].cloneNode(true));
    track.insertBefore(
      items[items.length - 1 - i].cloneNode(true),
      track.firstChild
    );
  }

  const total = track.children.length;
  index = visible;

  track.style.transform = `translateX(-${index * 25}%)`;

  function slideNext() {
    index++;
    track.style.transition = "transform .5s ease";
    track.style.transform = `translateX(-${index * 25}%)`;

    if (index >= total - visible) {
      setTimeout(() => {
        track.style.transition = "none";
        index = visible;
        track.style.transform = `translateX(-${index * 25}%)`;
      }, 500);
    }
  }

  function slidePrev() {
    index--;
    track.style.transition = "transform .5s ease";
    track.style.transform = `translateX(-${index * 25}%)`;

    if (index <= 0) {
      setTimeout(() => {
        track.style.transition = "none";
        index = total - visible * 2;
        track.style.transform = `translateX(-${index * 25}%)`;
      }, 500);
    }
  }

  document.querySelector(".flash-next").onclick = slideNext;
  document.querySelector(".flash-prev").onclick = slidePrev;

  setInterval(slideNext, 3000);
});
const preview = document.getElementById("mainPreview");
const thumbs = document.querySelectorAll(".thumb");
const thumbList = document.getElementById("thumbList");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");

    const type = thumb.dataset.type;
    const src = thumb.dataset.src;

    // RESET PREVIEW
    preview.innerHTML = "";

    if (type === "image") {
      const img = document.createElement("img");
      img.src = src;
      img.className = "img-fluid";
      preview.appendChild(img);
    }

    if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.className = "w-100";
      preview.appendChild(video);
    }

    if (type === "youtube") {
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.width = "100%";
      iframe.height = "360";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      preview.appendChild(iframe);
    }
  });
});

// SCROLL THUMB
document.querySelector(".thumb-nav.next").onclick = () => {
  thumbList.scrollLeft += 80;
};
document.querySelector(".thumb-nav.prev").onclick = () => {
  thumbList.scrollLeft -= 80;
};
