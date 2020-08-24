var dbPromised = idb.open("info-bola", 1, function(upgradeDb) {
    var infoObjectStore = upgradeDb.createObjectStore("infos", {
      keyPath: "id"
    });
    infoObjectStore.createIndex("info_title", "info_title", { unique: false });
  });

  function saveForLater(infos) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("infos", "readwrite");
        var store = tx.objectStore("infos");
        console.log(infos);
        store.put(infos);
        return tx.complete;
      })
      .then(function() {
        console.log("infos berhasil di simpan.");
      });
  } 

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("infos", "readonly");
          var store = tx.objectStore("infos");
          return store.getAll();
        })
        .then(function(infos) {
          resolve(infos);
        });
    });
  }
  
  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("infos", "readonly");
          var store = tx.objectStore("infos");
          return store.get(parseInt(id));
        })
        .then(function(info) {
          resolve(info);
        });
    });
  }

  function deleteById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("infos", "readwrite");
          var store = tx.objectStore("infos");
          return store.delete(parseInt(id));
        })
        .then(function(info) {
          resolve(info);
        });
    });
  }