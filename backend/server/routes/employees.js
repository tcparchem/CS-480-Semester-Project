const express = require('express');
const router = express.Router();

const connection = require('../db/database.js');

// TODO: Setup API Routes

// Basic GET route to call stored procedure to retrieve list of all employees
router.get('/getEmployees', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetEmployees();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;