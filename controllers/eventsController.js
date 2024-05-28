const { response, request } = require('express');
const Evento = require('../models/Evento')

const getEventos = async(req, res = response) => {


    try {

        const eventos = await Evento.find().populate('user', 'name');

        

        res.status(200).json({
            ok: true,
            eventos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error contacte al programador xd'
        });
    }


}

const crearEvento = async(req, res = response) => {
  
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save()

        res.status(200).json({
            ok: true,
            msg: 'getEventos',
            evento: eventoGuardado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error contacte al programador xd'
        });
    }

}

const actualizarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const userId = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento) {

            return res.status(400).json({
                ok: false,
                msg: 'No existe el evento que intenta editar'
            });

        }

        if(evento.user.toString() !== userId) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento.'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: userId
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true})

        return res.status(200).json({
            ok: true,
            eventoActualizado
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }

}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const userId = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento) {

            return res.status(400).json({
                ok: false,
                msg: 'No existe el evento que intenta eliminar'
            });

        }

        if(evento.user.toString() !== userId) {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento.'
            });
        }


        await Evento.findByIdAndDelete(eventoId)

        return res.status(200).json({
            ok: true,
            msg: 'Evento eliminado'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }

}

module.exports = {
    getEventos,
    actualizarEvento,
    crearEvento,
    eliminarEvento
}