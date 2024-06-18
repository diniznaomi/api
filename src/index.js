require('dotenv').config();
require('./database/index');
require('./api/cronJobs/checkPayments');

const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`server running in port ${process.env.PORT}`)
})