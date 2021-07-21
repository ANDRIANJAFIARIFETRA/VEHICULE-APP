const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const constant = require('./app_modules/constante');

//Instanciation Server
const server = express();
const port = constant.PORT;

server.use(cors());

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

const vehiculeRoute = require('./routes/vehicule.route')

const upload = require('./routes/uploadFiles');
server.use('/vehicule', vehiculeRoute);
server.use('/upload/', upload)
server.use('/static', express.static('./assets'));


server.get('/', (req, res ) => {                    // Réponse serever
    res.setHeader('Content-type', 'text/html');      
    res.status(200).send('<h1>Bienvenue dans le server </h1>');
}); 

server.listen(port, () => {
    console.log(`Server run at ${port}`);
})
