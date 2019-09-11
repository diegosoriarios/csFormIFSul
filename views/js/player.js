const csgoform = document.getElementById("csgoform");

csgoform.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  fetch('/player', {
    method: 'post',
    body: formData
  }).then(function(response) {
    return response.text();
  }).then(function(text) {
    console.log(text);
  }).catch(function(error) {
    console.error(error);
  })
})
