// import express from 'express';
const express = require(`express`);
const config = require(`../etc/config`);
const bodyParser = require(`body-parser`);

const db = require(`./utils/dbutils`);
db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.get(`/`, (req, res) => {
   res.send(`<h1>Hello world!</h1>`);
});

app.get(`/notes`, (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post(`/notes`, (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
    // console.log(req);
});

app.delete(`/notes/:id`, (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});


const server = app.listen(config.serverPort, ()=>{
    console.log(`Server is running on port ${config.serverPort}`);
});
