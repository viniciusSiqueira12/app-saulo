const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://appsaullo:appsaulo@cluster0.ud79y.mongodb.net/teste?retryWrites=true&w=majority', { useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true});

app.use("/files/",
  express.static(path.resolve(__dirname, './tmp/uploads'))
);

requireDir('./src/models');
app.use('/api',require('./src/routes'));

app.listen(process.env.PORT || 3000);