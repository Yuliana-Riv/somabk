'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/terrenos'})



let terrenos = require ('../modules/terrenos/controller');

router.get('/terrenos', [authp] , terrenos.getAll);
router.get('/terrenos/:id',  [authp], terrenos.getById);
router.get('/terrenos/colaborador/:id',  [authp], terrenos.getByColaborador);

router.post('/terrenos/create', [authenticated,authp], terrenos.create);
router.put('/terrenos/update/', [authenticated,authp] , terrenos.update);
router.delete('/terrenos/delete', [authenticated,authp] , terrenos.delete)
router.put('/terrenos/portada/update/', [authenticated,authp] , terrenos.updatePortada);

router.post('/terrenos/foto/create', [authenticated,authp] , multipartMiddleware , terrenos.createFoto);
router.get('/terrenos-img/:image', terrenos.getImageFile);
router.delete('/terrenos/foto/delete', [authenticated,authp] , terrenos.deleteFoto)
module.exports = router;