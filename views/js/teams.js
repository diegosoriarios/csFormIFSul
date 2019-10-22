const teamList = document.getElementById("team-list")
let newLink
//const PORT = process.env.PORT || 3000;
const PORT = 'https://cs-ifsul.herokuapp.com'

window.onload = () => {
    fetch(PORT + '/teams')
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            data.forEach(item => {
                newLink = document.createElement('a')
                newLink.href = "#"
                newLink.innerText = item.name
                newLink.className = "list-group-item list-group-item-action"
                teamList.appendChild(newLink)
            })
        })
}