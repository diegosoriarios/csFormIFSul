const csgoform = document.getElementById("csgoform");
//const PORT = process.env.PORT || 3000;
//const PORT = 'https://cs-ifsul.herokuapp.com'
const PORT = 'http://localhost:3000'

csgoform.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  //console.log("FORMDATA=>"+formData.get("nickname")+" | "+formData.get("team"));
  
  
  fetch(PORT + '/player', {
    headers : { "content-type" : "application/json; charset=UTF-8"},
    method: "POST",
    body: JSON.stringify({
      "nickname": formData.get("nickname"),
      "team": formData.get("team")
    })
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    //console.log(text);
    window.location.replace(text);
  }).catch(function(error) {
    console.error(error);
  })
})
