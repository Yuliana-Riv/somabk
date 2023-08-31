'use strict'
var cron = require ('node-cron');
let  express = require ('express');
let  morgan = require ('morgan');
let  cors = require  ('cors');
let path = require ('path');

//NodeCron
let session = require('./src/services/cron/delExpSessions')

const app = express();
const local_port = 3471;

cron.schedule('30 * * * *', function() { 
    session.execute();
});





app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//  Cargar archivos de rutas

let test = require('./src/routes/test');
let user = require('./src/routes/user');
let colaborador = require('./src/routes/colaborador');
let terrenos = require('./src/routes/terrenos');
let profile = require('./src/routes/profile');
let personalize = require('./src/routes/personalize');
let casas = require('./src/routes/casas');
let oficinas = require('./src/routes/oficinas');
let locales = require('./src/routes/locales');
let suscripciones = require('./src/routes/suscripciones');

const baseStr = '/api/Ncl_q3O';

app.use(baseStr, test);
app.use(baseStr, user);
app.use(baseStr, colaborador);
app.use(baseStr, profile);
app.use(baseStr, personalize);
app.use(baseStr, terrenos);
app.use(baseStr, casas);
app.use(baseStr, oficinas);
app.use(baseStr, locales);
app.use(baseStr, suscripciones);

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || local_port);
const server = app.listen(app.get('port'), () => {
    console.log('Listening on port: ', app.get('port'));
});
