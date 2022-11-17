const express = require('express')
const mongoose = require('mongoose')
const TempleRoutes = require('./routes/template')
const api = require('./middleware/api')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://127.0.0.1:27017/template', {
	useNewUrlParser: true,
})

const app = express()
// req.body()
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
)
app.use(api)
app.use('/cjy/v1', TempleRoutes)
// app.use('/', (req, res, next) => {
// 	res.send('hello Express & Hello node')
// })
app.use((req, res, next) => {
	const err = new Error('not Found')
	err.status = 404
	next(err)
})
app.listen(8088, () => {
	console.log('server is running on http://localhost:8088')
})

module.exports = app
