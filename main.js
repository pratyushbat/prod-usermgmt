// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')

const app = express();
const PORT = parseInt(process.env.PORT) || 4000;
const path = require('path');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('connect to database'))
  .catch(e=>console.log(e));
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'dist/user-mgmt'))); 
app.use(cors())

//route prefix
app.use("",require('./routes/routes'))

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/user-mgmt/index.html'))
})
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})