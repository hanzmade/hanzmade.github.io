let base_url = "https://api.football-data.org/v2/competitions";
const API_KEY = 'd80e8844b0f246a4ad9de828d747a707';

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getKlasemens() {
  if ("caches" in window) {
      caches.match(`/v2/competitions/2014/standings`).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let articlesHTML = "";
            data.standings[1].table.forEach(function(data_liga) {
              let clubImage = data_liga.team.crestUrl;        
              if (clubImage !== null) {            
                clubImage = data_liga.team.crestUrl.replace(/^http:\/\//i, 'https://');        
              }
              articlesHTML += `
                    <div class="card small col s12 m4">
                      <a href="./klasemen.html?id=${data_liga.team.id}">
                        <div class="card-image waves-effect waves-block waves-light" style="width:50%;height:auto">
                          <img src="${clubImage}" />
                        </div>
                      </a>
                      <div class="card-content">
                        <span class="card-title truncate">${data_liga.team.name}</span>
                        <p>${data_liga.points}</p>
                      </div>
                    </div>
                  `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("klasemen-liga").innerHTML = articlesHTML;
          });
        }
      });
  }

    fetch(`${base_url}/2014/standings` ,{
      method: 'GET',
      headers: new Headers({
        'X-Auth-Token': API_KEY
      }), 
    })
      .then(status)
      .then(json)
      .then(function(data) {
        let articlesHTML = "";
        data.standings[1].table.forEach(function(data_liga) {
          let clubImage = data_liga.team.crestUrl;        
          if (clubImage !== null) {            
            clubImage = data_liga.team.crestUrl.replace(/^http:\/\//i, 'https://');        
          }
          articlesHTML += `
              <div class="col s12 m4">
                <div class="card small">
                  <a href="./klasemen.html?id=${data_liga.team.id}">
                    <div class="card-image waves-effect waves-block waves-light" style="width:50%;height:auto">
                      <img src="${clubImage}" alt="${data_liga.team.name}"/>
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${data_liga.team.name}</span>
                    <p>${data_liga.points}</p>
                  </div>
                </div>
              </div>
              `;
        });
        
        try
        {
          document.getElementById("klasemen-liga").innerHTML = articlesHTML;
        }catch(e){};
        
      })
      .catch(error);
}

function getKlasemenById() {
  return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    console.log("kesini 1");
    if ("caches" in window) {
      console.log("kesini");
      caches.match("/v2/teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let clubImage = data.crestUrl;        
            if (clubImage !== null) {            
              clubImage = data.crestUrl.replace(/^http:\/\//i, 'https://');        
            }
            let articleHTML = `
              <div class="card small col s12 m6">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${clubImage}" alt="${data.name}"/>
                </div>
                <div class="card-content">
                  <span class="card-title">${data.name}</span>
                  <p>Address : ${data.address}</p>
                  <p>Phone : ${data.phone}</p>
                  <p>Email : ${data.email}</p>
                  <p>Founded in : ${data.founded}</p>
                </div>
              </div>
            `;
            document.getElementById("body-content").innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetch("https://api.football-data.org/v2/teams/" + idParam,{
      method: 'GET',
      headers: new Headers({
        'X-Auth-Token': API_KEY
      }), 
    })
      .then(status)
      .then(json)
      .then(function(data) {
        let clubImage = data.crestUrl;        
        if (clubImage !== null) {            
          clubImage = data.crestUrl.replace(/^http:\/\//i, 'https://');        
        }
        let articleHTML = `
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img src="${clubImage}" alt="${data.name}"/>
          </div>
          <div class="card-content">
            <span class="card-title">${data.name}</span>
            <p>Address : ${data.address}</p>
            <p>Phone : ${data.phone}</p>
            <p>Email : ${data.email}</p>
            <p>Founded in : ${data.founded}</p>
          </div>
        </div>
      `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function(datas) {
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    datas.forEach(function(data) {
      let clubImage = data.crestUrl;        
      if (clubImage !== null) {            
        clubImage = data.crestUrl.replace(/^http:\/\//i, 'https://');        
      }
      articlesHTML += `
                  <div class="card">
                    <a href="./klasemen.html?id=${data.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${clubImage}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${data.name}</span>
                      <p>${data.address}</p>
                      <p>${data.phone}</p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    console.log(idParam);
    getById(idParam).then(function(data) {
      let articleHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${data.crestUrl}" />
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          <p>Address : ${data.address}</p>
          <p>Phone : ${data.phone}</p>
          <p>Email : ${data.email}</p>
          <p>Founded in : ${data.founded}</p>
        </div>
      </div>
    `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
      resolve(data);
    });
  });
}

//loading screen
function onReady(callback) {
  let intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.container', true);
  setVisible('#loading', false);
});