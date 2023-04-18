//const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(process.env.PORT,()=>console.log(`listening on port ${process.env.PORT}`))


// mongoose.connect(process.env.DBSTRING, { useUnifiedTopology: true, useNewUrlParser: true })
//         .then(() => console.log('Connected!'));