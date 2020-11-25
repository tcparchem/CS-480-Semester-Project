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
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to retrieve all shifts from the shifts table
router.get('/getShifts', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetShifts();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to retrieve all shifts from the shifts table during the week time frame, week start on Sunday
router.get('/getShiftsThisWeek', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetShiftsThisWeek();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to retrieve all shifts from the shifts table this month
router.get('/getShiftsThisMonth', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    connection.query('CALL GetShiftsThisMonth();', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to retrieve all shifts from the shifts table where the first and last name are used as search parameters
router.get('/retrieveShiftsByName', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    var firstName = req.query.firstName
    var lastName = req.query.lastName

    connection.query('CALL retrieveShiftsByName("' + firstName + '", "' + lastName + '");', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to retrieve all shifts from the shifts table where the start and end datetime range are used as search parameters
router.get('/retrieveShiftsByTime', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    var startTime = req.query.startTime
    var endTime = req.query.endTime

    connection.query('CALL retrieveShiftsByTime("' + startTime + '", "' + endTime + '");', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to delete shift from table given shift ID
router.delete('/deleteShift', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    var shiftID = req.query.id

    connection.query('CALL deleteShift(' + shiftID + ');', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});

// API route to call sproc to add shift to the shifts table
router.post('/addShift', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    var employeeID = req.query.employeeID 
    var startTime = req.query.startTime
    var endTime = req.query.endTime 
    var position = req.query.position 
    var location = req.query.location

    connection.query('CALL addShift(' + employeeID + ', "' + startTime + '", "' + endTime + '", "' + position + '", "' + location + '");', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.status(500).send({ error: err });
        }
    });
});


module.exports = router;