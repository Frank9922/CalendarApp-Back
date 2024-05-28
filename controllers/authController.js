const { response } = require('express');
const  bcrypt  = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async(req, res = response) => {

     const { name, email, password } = req.body

    try {

        let usuario = await Usuario.findOne({email});

        if(usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este email ya esta registrado'
            });
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const token = await generarJWT(usuario.id, usuario.name);

        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
     })
    

    } catch (err) {

     }
    
    }





const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body

    try {
        let usuario = await Usuario.findOne({email});

        if(!usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Este email no esta registrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect'
            });
        }

        //generacion de token
        const token = await generarJWT(usuario.id, usuario.name);


        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

            
        });



    } catch (err) {

    }
}

const reNewToken = async(req, res = response) => {


    const {uid, name } = req


    const token = await generarJWT(uid, name);

    res.json({
        ok:true,
        message:' token',
        token

    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    reNewToken
}