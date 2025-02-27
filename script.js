document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("theme-selector");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const photoGallery = document.getElementById("photo-gallery");
  const videoGallery = document.getElementById("video-gallery");
  const uploadForm = document.getElementById("upload-form");
  const fileInput = document.getElementById("file-input");

  let mediaStats = {
    views: {},
    downloads: {}
  };

  // Changer de thème
  themeSelector.addEventListener("change", function () {
    document.body.classList.remove("light-mode", "dark-mode", "neon-mode");
    document.body.classList.add(themeSelector.value + "-mode");
    localStorage.setItem("theme", themeSelector.value);
  });

  if (localStorage.getItem("theme")) {
    document.body.classList.add(localStorage.getItem("theme") + "-mode");
    themeSelector.value = localStorage.getItem("theme");
  }

  // Rechercher un média
  searchBtn.addEventListener("click", function () {
    const searchQuery = searchInput.value.toLowerCase();
    const images = photoGallery.querySelectorAll("img");
    const videos = videoGallery.querySelectorAll("video");
    
    images.forEach(img => img.style.display = img.src.toLowerCase().includes(searchQuery) ? "block" : "none");
    videos.forEach(video => video.style.display = video.src.toLowerCase().includes(searchQuery) ? "block" : "none");
  });

  // Ajouter un fichier
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const file = fileInput.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = event.target.result;
        photoGallery.appendChild(img);
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = event.target.result;
        video.controls = true;
        videoGallery.appendChild(video);
      }
    };
    reader.readAsDataURL(file);
  });
});
