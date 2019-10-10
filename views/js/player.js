const csgoform = document.getElementById("csgoform");

csgoform.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  console.log("FORMDATA=>"+formData.get("nickname")+" | "+formData.get("team"));
  fetch(process.env.PORT + '/player', {
    headers : { "content-type" : "application/json; charset=UTF-8"},
    method: "POST",
    body: JSON.stringify({
      "nickname": formData.get("nickname"),
      "team": formData.get("team")
    })
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text);
    window.location.replace(text);
  }).catch(function(error) {
    console.error(error);
  })
})
