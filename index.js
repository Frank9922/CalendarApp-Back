const express = require('express')
const { connectionDB } = require('./database/config')
const cors = require('cors');
require('dotenv').config();

console.log(process.env)

const app = express();

connectionDB();

app.use(cors())

app.use(express.json())

app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'))

app.use('/api/events', require('./routes/events'))





app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 4000')
})