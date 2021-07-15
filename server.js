import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import db from './studentModel.js';
import dotEnv from 'dotenv';
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

// app config
app.use(cors());
app.use(express.json());

// db config
mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// routes
app.get('/', (req, res) => {
  res.status(200).send('API IS LIVE');
});

app.post('/students', (req, res) => {
  const newStudent = req.body;

  db.create(newStudent, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/students', (req, res) => {
  db.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/students/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/students/add/newSubject', (req, res) => {
  const newSubject = req.body;

  db.updateOne(
    { _id: req.query.id },
    { $push: { subjects: newSubject } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.post('/students/add/newSociety', (req, res) => {
  const newSociety = req.body;

  db.updateOne(
    { _id: req.query.id },
    { $push: { society: newSociety } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.delete('/students/:id', (req, res) => {
  db.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send(data);
    }
  });
});

// listen
app.listen(PORT, () => console.log('Server has started on PORT No: ', PORT));
