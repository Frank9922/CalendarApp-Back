require('dotenv').config();
const mongoose = require('mongoose')

const connectionDB = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN)

        console.log('DB Online');

    } catch (e) {
        console.log(e)
        throw new Error('Error al hora de inicializar BD')
    }
}


module.exports = {
    connectionDB
}