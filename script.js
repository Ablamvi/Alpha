document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("theme-selector");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const photoGallery = document.getElementById("photo-gallery");
  const videoGallery = document.getElementById("video-gallery");
  const uploadForm = document.getElementById("upload-form");
  const fileInput = document.getElementById("file-input");
  const preview = document.getElementById("preview");
  const albumList = document.getElementById("album-list");
  const albumName = document.getElementById("album-name");
  const createAlbum = document.getElementById("create-album");

  // Changer de thème
  themeSelector.addEventListener("change", function () {
    document.body.classList.remove("light-mode", "dark-mode", "neon-mode");
    document.body.classList.add(themeSelector.value + "-mode");
  });

  // Aperçu avant l’upload
  fileInput.addEventListener("change", function () {
    preview.innerHTML = "";
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const media = file.type.startsWith("image/") ? document.createElement("img") : document.createElement("video");
        media.src = e.target.result;
        if (file.type.startsWith("video/")) media.controls = true;
        preview.appendChild(media);
      };
      reader.readAsDataURL(file);
    }
  });

  // Ajouter un album
  createAlbum.addEventListener("click", function () {
    if (albumName.value.trim() !== "") {
      const album = document.createElement("div");
      album.textContent = albumName.value;
      album.classList.add("album");
      albumList.appendChild(album);
      albumName.value = "";
    }
  });

  // Générer un graphique de statistiques
  new Chart(document.getElementById("stats-chart"), {
    type: "bar",
    data: {
      labels: ["Photos", "Vidéos"],
      datasets: [{ data: [10, 5], backgroundColor: ["#4CAF50", "#FF5722"] }]
    },
    options: { responsive: true }
  });
});