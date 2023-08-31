'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/casas'})



let casas = require ('../modules/casas/controller');

router.get('/casas', [authp] , casas.getAll);
router.get('/casas/:id',  [authp], casas.getById);
router.get('/casas/colaborador/:id',  [authp], casas.getByColaborador);

router.post('/casas/create', [authenticated,authp], casas.create);
router.put('/casas/update/', [authenticated,authp] , casas.update);
router.delete('/casas/delete', [authenticated,authp] , casas.delete)
router.put('/casas/portada/update/', [authenticated,authp] , casas.updatePortada);

router.post('/casas/foto/create', [authenticated,authp] , multipartMiddleware , casas.createFoto);
router.get('/casas-img/:image', casas.getImageFile);
router.delete('/casas/foto/delete', [authenticated,authp] , casas.deleteFoto)
module.exports = router;