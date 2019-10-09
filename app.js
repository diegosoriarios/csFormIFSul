const express = require("express")
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//MONGO
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:cszao0101@cluster0-llrk5.mongodb.net/test?retryWrites=true&w=majority&keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000', {useNewUrlParser: true,  useUnifiedTopology: true });

//LOCALHOST
//mongoose.connect('mongodb://127.0.0.1/cs', {useNewUrlParser: true,  useUnifiedTopology: true })

//MODEL
const Player = mongoose.model('Player', { name: String, team: String })
const Team = mongoose.model('Team', { name: String, players: Array })

app.use(bodyParser.json())

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/success', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/success.html'));
});

app.get('/error', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/error.html'));
});

app.get('/teams', (req, res) => {
	Team.find().exec().then(response => {
		res.send(response)
	})
})

app.post('/player', (req, res) => {
	console.log(req.body)

	Player.find({ name: req.body.nickname }).exec().then(response => {
		if(response.length !== 0) {
			console.log("Player já existe")
			return res.send('/error')
		} else {
			const p = new Player({ name: req.body.nickname, team: req.body.team });

			Team.find({ name: req.body.team }).exec().then(resp => {
				console.log('resp', resp)
				if (resp.length !== 0) {
					console.log('res', resp[0].players)
					if (resp[0].players.length < 5) {
						// Não está adicionando no array de players
						Team.updateOne({ name: req.body.team }, { name: req.body.team, $push: { players:  req.body.nickname} }).exec()
						//
						p.save().then(() => console.log(p))
						return res.send('/success')
					} else {
						console.log("Time está completo")
						return res.send('/error')
					}
				} else {
					let auxArray = [req.body.nickname]
					const t = new Team({ name: req.body.team, players: auxArray })
					t.save().then(() => console.log(t));
					p.save().then(() => console.log(p));
					return res.send('success')
				}
				
			})
		}
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Servidor rodando")
})