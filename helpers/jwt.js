const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {
    
    return new Promise((resolve, reject) => {

        const payload = {uid, name}

        jwt.sign(payload, process.env.SCECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
                if(err){
                    console.log(err)
                    reject('No se pudo generar el jwt')
                }

                resolve(token)
        })

    })

}

module.exports = {
    generarJWT
}