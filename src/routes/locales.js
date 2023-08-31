'use strict'

let  express = require('express');
const router = express.Router();
const {authenticated,authp} = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/locales'})



let locales = require ('../modules/locales/controller');

router.get('/locales', [authp] , locales.getAll);
router.get('/locales/:id',  [authp], locales.getById);
router.get('/locales/colaborador/:id',  [authp], locales.getByColaborador);

router.post('/locales/create', [authenticated,authp], locales.create);
router.put('/locales/update/', [authenticated,authp] , locales.update);
router.delete('/locales/delete', [authenticated,authp] , locales.delete)
router.put('/locales/portada/update/', [authenticated,authp] , locales.updatePortada);

router.post('/locales/foto/create', [authenticated,authp] , multipartMiddleware , locales.createFoto);
router.get('/locales-img/:image', locales.getImageFile);
router.delete('/locales/foto/delete', [authenticated,authp] , locales.deleteFoto)
module.exports = router;