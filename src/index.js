require('dotenv').config();
require('./database/index');
require('./api/cronJobs/checkPayments');

const express = require('express');
const cors = require('cors'); 
const routes = require('./routes/index');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
