const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => console.log(`Ready on port: ${process.env.PORT}`));
