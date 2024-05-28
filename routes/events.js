const { Router } = require('express')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventsController');
const { validarJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

//Todas las rutas protegidas
router.use(validarJWT);

//Obtener los eventos
router.get('/',  getEventos );

//Crear evento 
router.post('/',
            [ 
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'La fecha de inicializacion debe ser obligatoria').custom(isDate),
                check('end', 'La fecha de finalizacion debe ser obligatoria').custom(isDate),
                validarCampos

            ],
            crearEvento );

//Actualizar evento
router.put('/:id',  actualizarEvento );

//Eliminar evento
router.delete('/:id',  eliminarEvento );


module.exports = router;