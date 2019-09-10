const express = require("express")
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//MONGO
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:cszao0101@cluster0-llrk5.mongodb.net/test?retryWrites=true&w=majority&keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000', {useNewUrlParser: true,  useUnifiedTopology: true });

//MODEL
const Player = mongoose.model('Player', { name: String, team: String })
const Team = mongoose.model('Team', { name: String, players: Array })

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/teams', (req, res) => {
	Team.find({ }).exec().then(res => {
		console.log(res)
	})
	res.send("Hello")
})

app.post('/player', (req, res) => {
	console.log(req.body)

	Player.find({ name: req.body.name }).exec().then(response => {
		if(response.length !== 0) {
			console.log("Player já existe")
		} else {
			const p = new Player({ name: req.body.name, team: req.body.team });

			Team.find({ name: req.body.team }).exec().then(resp => {
				console.log('resp', resp)
				if (resp.length !== 0) {
					console.log('res', resp[0].players)
					if (resp[0].players.length < 5) {
						let auxArray = resp[0].players
						auxArray.push(req.body.name)
						console.log('auxArray', auxArray)
						// Não está adicionando no array de players
						Team.updateOne({ name: req.body.team }, { $set: {players:  auxArray} })
						//
						p.save().then(() => console.log(p))
					} else {
						console.log("Time está completo")
					}
				} else {
					let auxArray = [req.body.name]
					const t = new Team({ name: req.body.team, players: auxArray })
					t.save().then(() => console.log(t));
					p.save().then(() => console.log(p));
				}
				
			})
		}
	})
	
	res.sendStatus(200)
})

app.listen(3000, () => {
	console.log("Servidor rodando na porta ", 3000)
})