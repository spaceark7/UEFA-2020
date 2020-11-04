var dbPromised = idb.open("uefa-2020", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("team_title", "team_title", { unique: false });
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team berhasil di simpan.");
      });
  }

  function deleteTeam(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(parseInt(team));
        return tx.complete;
      })
      .then(function() {
        console.log("Team berhasil di hapus.");
        history.back()
      });
  }


  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          console.log("MMFFF", store.getAll());
          return store.getAll();
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

  function getById(id) {

    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          console.log("GBDstore: ", store);
          console.log("parsed param", store.get(parseInt(id)));
          return store.get(parseInt(id));
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

