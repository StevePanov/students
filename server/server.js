const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const cors = require('cors')

const port = 8080;
const app            = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// подключение к бд
MongoClient.connect(
    `mongodb://localhost:27017/students`,
    (err, db) => {
        if (err) console.log('Caught error ', err);
        require('./routes')(app, db);
        app.listen(port, () =>
            console.log(`Listening on port ${port}!`)
        );
    }
);