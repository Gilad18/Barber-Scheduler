const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const path = require('path');
app.use(cors());

const port = process.env.PORT || 3900;

const myBarberShop = require('./server/routes/routes')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/mybarber/api', myBarberShop);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.d82yt.mongodb.net/mybarber`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("database connect")
});

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
    // Express serve up index.html file if it doesn't recognize route
  
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'barber', 'build', 'index.html'));
    });
  }

  app.listen(port, () => {
    return console.log(`application start`);
  })