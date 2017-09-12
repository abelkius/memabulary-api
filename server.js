const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Set = require('./model/set');
const env = require('./env');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.port || 8080;

const router = express.Router();

//--- ROUTES -------------------------------------------------------------------

router.use((req, res, next) => {
  console.log('It is known that now... ');
  next();
})

router.get('/', (req, res) => {
  res.json({message: 'You know nothing, Jon Snow!'})
})

router.route('/sets')
      .post((req, res) => {
        const set = new Set();
        set.title = req.body.title;

        set.save((err) => {
          if(err) {
            res.send(err);
          }
          res.json({message: 'set created!'});
        })
      })
      .get((req, res) => {
        Set.find((err, sets) => {
          if(err) {
            res.send(err);
          }
          res.json(sets)
        })
      });

router.route('/sets/:set_id')
      .get((req, res) => {
        Set.findById(req.params.set_id, (err, set) => {
          if (err) {
            res.send(err);
          }
          res.json(set);
        })
      })
      .put((req, res) => {
        Set.findById(req.params.set_id, (err, set) => {
          if (err) {
            res.send(err);
          }
          set.title = req.body.title;
          set.save((err) => {
            if (err) {
              err.send();
            }
            res.json({message: 'set updated!'});
          })
        })
      })
      .delete((req, res) => {
        Set.remove({
            _id: req.params.set_id
          },
          (err, set) => {
            if (err) {
              err.send();
            }
            res.json({message: 'Successfuly deleted!'});
          })
      });

app.use('/api', router);

app.listen(port);

console.log('Winter is coming on port ' + port);

//--- DB ----------------------------------------------------------------------

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${env.db.user}:${env.db.pass}@ds113713.mlab.com:13713/memabulary`,  {
  useMongoClient: true,
});
