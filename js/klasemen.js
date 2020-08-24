// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }
  document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var btnSave = document.getElementById("save");
    var btnDelete = document.getElementById("delete");
    if (isFromSaved) {
      // Hide fab jika dimuat dari indexed db
      btnSave.style.display = 'none';
      var item = getSavedArticleById();
    } 
    else {
      btnDelete.style.display = 'none';
      var item = getKlasemenById();
    }
    btnSave.onclick = function() {
      item.then(function(data) {
        saveForLater(data);
      });
    };
    
    btnDelete.onclick = function() {
        item.then(function(data) {
          deleteById(data.id);
        })
        .then(function(response){
          console.log("item delete successfully !!!")
          window.location.href = "/#saved";
        });
    };
  });