
// IMPORTS
const express = require('express');
    const app = express();
const routes = require('./routes');
const sequelize = require('./config/connection');
const PORT = process.env.PORT || 3001;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

// SYNC DATABASE + CONNECT TO SERVER
sequelize.sync({force: false})
.then(app.listen(PORT, () => 
    console.log(`App listening on Port ${PORT}!`))
);