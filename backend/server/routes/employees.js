const express = require('express');
const router = express.Router();

const connection  = require('../db/database.js');

// TODO: Setup API Routes

// Basic GET to retrieve entire table of employees
router.get('/', (req, res) => {
  connection.query('SELECT * FROM employeeattrition', (err, rows, fields) => {
      if(!err) {
          res.json(rows);
      } else {
          console.log(err);
      }
  });  
});

module.exports = router;