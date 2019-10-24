const teamList = document.getElementById("team-list")
let newPlayer
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
            let newLink = document.getElementById("team-list")
            let teamName = document.getElementById("dropdownMenuButton")
            let teamItems = document.getElementById('dropdown-div')
            data.forEach(item => {
                console.log(item)
                newPlayer = document.createElement('a')
                newPlayer.href = "#"
                newPlayer.innerText = item.players
                newPlayer.className = "dropdown-item"
                teamName.innerHTML = item.name
                
                teamItems.appendChild(newPlayer)

                newLink.appendChild(teamName)
                
                //const teamList = document.getElementById("team-list")
                //teamList.appendChild(newLink)    
            })
        })
}