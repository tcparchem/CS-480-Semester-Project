const express = require('express');
const router = express.Router();


const connection = require('../db/database.js');

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

router.get('/getShifts', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetShifts();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/getShiftsThisWeek', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetShiftsThisWeek();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/getShiftsThisMonth', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetShiftsThisMonth();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.delete('/deleteShift', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    var shiftID = req.query.id

    connection.query('CALL deleteShift(' + shiftID + ');', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;