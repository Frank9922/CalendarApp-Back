const { Router } = require('express')
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, reNewToken } = require('../controllers/authController');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt')


const router = Router();

router.post(
    '/new',
    [
        //middleware
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
        validarCampos

    ],
    crearUsuario)

router.post(
    '/',
    [
        //middleware
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
        validarCampos

    ],
    loginUsuario)

router.get('/renew', validarJWT, reNewToken) 

module.exports = router;