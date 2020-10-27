
const BASE_URL = "http://api.football-data.org/v2/competitions/2001/"
const test = "https://api.football-data.org/v2/competitions/CL/matches"
function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }
  }
  // Blok kode untuk memparsing json menjadi array JavaScript
  function json(response) {
    return response.json();
  }
  // Blok kode untuk meng-handle kesalahan di blok catch
  function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
  }
 
  
 

  function getMatches() {
      console.log('executed')
      const req_url = BASE_URL + "matches?status=SCHEDULED";
      //console.log(fetch(test).then(response => response.json()).then(data => console.log(data)));
  $.ajax({
      headers: {'X-Auth-Token' : '85e85d47f2724735945be2d1675c7207'},
      url: req_url,
      dataType : 'json',
      type: 'GET',     
  }).done(function(response) {
      console.log(response)
  })
  
    }



  
        const menu = document.getElementById('matches');
        console.log('menu is', menu);
        menu.addEventListener('click', function() {
            getMatches();
        })
    