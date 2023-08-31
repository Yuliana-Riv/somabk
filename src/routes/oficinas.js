'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/oficinas'})



let oficinas = require ('../modules/oficinas/controller');

router.get('/oficinas', [authp] , oficinas.getAll);
router.get('/oficinas/:id',  [authp], oficinas.getById);
router.get('/oficinas/colaborador/:id',  [authp], oficinas.getByColaborador);

router.post('/oficinas/create', [authenticated,authp], oficinas.create);
router.put('/oficinas/update/', [authenticated,authp] , oficinas.update);
router.delete('/oficinas/delete', [authenticated,authp] , oficinas.delete)
router.put('/oficinas/portada/update/', [authenticated,authp] , oficinas.updatePortada);

router.post('/oficinas/foto/create', [authenticated,authp] , multipartMiddleware , oficinas.createFoto);
router.get('/oficinas-img/:image', oficinas.getImageFile);
router.delete('/oficinas/foto/delete', [authenticated,authp] , oficinas.deleteFoto)
module.exports = router;