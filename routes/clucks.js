const express = require('express');
const database = require('../db/client');
const router = express.Router();


router.get('/', (req, res) => {
  database('clucks')
    .orderBy('created_at', 'desc')
    .then((data) => {
      res.render('clucks/index', { data: data });
    });
});


router.get('/new', (req, res) => {
  res.render('clucks/newCluck', { data: false });
});

router.post('/', (req, res) => {
  database('clucks')
    .insert({
      username: req.cookies.username,
      image_url: req.body.image_url,
      content: req.body.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .returning('*')
    .then((data) => {
      console.log(data);
      // const val = data[0];
      res.redirect(`/clucks`);
    });
});

module.exports = router;
