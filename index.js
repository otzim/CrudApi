const express = require('express');
const bodyParser = require('body-parser');

// créer une application express
const app = express();

// configurer le port serveur
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// définir la route
app.get('/', (req, res)=>{
    res.send('Hello World');
});
// itinéraires d’importation des employés
const employeeRoutes = require('./src/routes/employee.route');

// créer des itinéraires pour les employés
app.use('/api/v1/employee', employeeRoutes);

// listen vers le port
app.listen(port, ()=>{
    console.log(`Express fonctionne au port ${port}`);
});