
const MATCH_BASE_URL = "http://staging-api.football-data.org/v2/matches/";
const BASE_URL = "http://api.football-data.org/v2/competitions/2001/";
const test = "https://api.football-data.org/v2/competitions/CL/standings";
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
      
      const req_url = BASE_URL + "matches?status=SCHEDULED";
      fetch(req_url, {headers: {'X-Auth-Token' : '85e85d47f2724735945be2d1675c7207'}}).then(status).then(json).then(function(data) {
      console.log(data)
      let matchesData = '';
      let time = ''
      data.matches.forEach(function (match) {
        time = new Date(match.utcDate);
          matchesData += `<div class="mcard-container">
          <a  href="./content.html?id=${match.id}">
          <div class="mcard row">
              <div class="mtimeDate col s6 m6 l6"><p>${time.toUTCString().slice(0,17)}</p></div>
              <div class="mtimeClock col s6 m6 l6"><p>${time.toUTCString().slice(17)}</p></div>
          </div>
          <div class="mteam row">
              <div class="homeTeam col s5 m5 l5">
                  <img class='logo' src="" alt="">
                  <h3 class="homeTeamName">${match.homeTeam.name}</h3>
              </div>
              <div class="versusBlock col s1 m1 l1"><h3>V</h3></div>
              <div class="AwayTeam col s5 m5 l5">
                  <h3 class="AwayTeamName">${match.awayTeam.name}</h3>
                  <img class='logo' src="" alt="">            
              </div>
          </div>
          <div id='small-detail' class="row"><p>${match.group}</p></div>
      </div> </a>`;
      })

      document.getElementById('body-content').innerHTML = matchesData;
      document.getElementById('body-content').style.background= "url(assets/top-image.jpg)50% 50%";
      document.getElementById('body-content').style.backgroundSize = "cover";
      document.getElementById('body-content').style.visibility = "visible";
      document.getElementById('body-content').scrollIntoView(true);
      
      });


      //console.log(fetch(test).then(response => response.json()).then(data => console.log(data)));
  // $.ajax({
  //     headers: {'X-Auth-Token' : '85e85d47f2724735945be2d1675c7207'},
  //     url: req_url,
  //     dataType : 'json',
  //     type: 'GET',     
  // }).done(function(response) {
  //   console.log(response.matches)
  //     let matchesData = '';
      
  // })
  
    }

  function getAllTeam() {

      fetch("http://api.football-data.org/v2/teams/18", {headers: {'X-Auth-Token' : '85e85d47f2724735945be2d1675c7207'}}).then(status).then(json).then(function(data) {
        console.log(data) 

      })


  }
  function getStandings() {

    fetch(BASE_URL + "standings?standingType=TOTAL", {headers: {'X-Auth-Token' : '85e85d47f2724735945be2d1675c7207'}}).then(status).then(json).then(function(data) {
      console.log(data) 
      let standingsData = '';
      data.standings.forEach(function(standing) {
        standingsData += `<div class="scard-container">
        <h3>${standing.group}</h3>

        <table class=" highlight centered">
            <thead>
                <th>Team</th>
                <th>Points</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>D</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
            </thead>
            <tbody>
                <tr>
                    <td id='tname'>${standing.table[0].team.name}</td>
                    <td>${standing.table[0].points}</td>
                    <td>${standing.table[0].playedGames}</td>
                    <td>${parseInt(standing.table[0].playedGames) - parseInt(standing.table[0].lost) - parseInt(standing.table[0].draw)}</td>
                    <td>${standing.table[0].lost}</td>
                    <td>${standing.table[0].draw}</td>
                    <td>${standing.table[0].goalsFor}</td>
                    <td>${standing.table[0].goalsAgainst}</td>
                    <td>${standing.table[0].goalDifference}</td>
                </tr>
    
                <tr>
                <td id='tname'>${standing.table[1].team.name}</td>
                <td>${standing.table[1].points}</td>
                <td>${standing.table[1].playedGames}</td>
                <td>${standing.table[1].points/2}</td>
                <td>${standing.table[1].lost}</td>
                <td>${standing.table[1].draw}</td>
                <td>${standing.table[1].goalsFor}</td>
                <td>${standing.table[1].goalsAgainst}</td>
                <td>${standing.table[1].goalDifference}</td>
                    
                </tr>
    
                <tr>
                <td id='tname'>${standing.table[2].team.name}</td>
                <td>${standing.table[2].points}</td>
                <td>${standing.table[2].playedGames}</td>
                <td>${standing.table[2].points/2}</td>
                <td>${standing.table[2].lost}</td>
                <td>${standing.table[2].draw}</td>
                <td>${standing.table[2].goalsFor}</td>
                <td>${standing.table[2].goalsAgainst}</td>
                <td>${standing.table[2].goalDifference}</td>
                </tr>
    
                <tr>
                <td id='tname'>${standing.table[3].team.name}</td>
                <td>${standing.table[3].points}</td>
                <td>${standing.table[3].playedGames}</td>
                <td>${standing.table[3].points/2}</td>
                <td>${standing.table[3].lost}</td>
                <td>${standing.table[3].draw}</td>
                <td>${standing.table[3].goalsFor}</td>
                <td>${standing.table[3].goalsAgainst}</td>
                <td>${standing.table[3].goalDifference}</td>
                </tr>
                
            </tbody>
        </table>
    </div>`
      })

      document.getElementById('body-content').innerHTML = standingsData;
      document.getElementById('body-content').style.background= "url(assets/top-image.jpg)50% 50%";
      document.getElementById('body-content').style.backgroundSize = "cover";
      document.getElementById('body-content').style.visibility = "visible";
      document.getElementById('body-content').scrollIntoView(true);


    })
    


}


window.addEventListener('load', function() {
 
})