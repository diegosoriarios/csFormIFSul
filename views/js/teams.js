const teamList = document.getElementById("team-list")
let newLink
//const PORT = process.env.PORT || 3000;
const PORT = 'https://cs-ifsul.herokuapp.com'
//const PORT = 'http://localhost:3000'

window.onload = () => {
    fetch(PORT + '/returnTeams')
        .then(response => {
            return response.json()
        })
        .then(data => {
            //console.log(data)
            data.forEach(item => {
                newLink = document.createElement('a')
                newLink.href = "#"
                newLink.innerText = item.players
                newLink.className = "list-group-item list-group-item-action"
                
                const teamList = document.getElementById("team-list")
                teamList.appendChild(newLink)    
            })
        })
}