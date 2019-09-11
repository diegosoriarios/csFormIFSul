const teamList = document.getElementById("team-list")
let newLink

window.onload = () => {
    fetch('http://localhost:3000/teams')
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