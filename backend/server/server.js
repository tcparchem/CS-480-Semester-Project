const express = require('express');
const app = express();

// Set up port for Database
app.set('port', process.env.PORT || 3000);

// Tell Express to use JSON format
app.use(express.json());

// Routes
app.use(require('./routes/employees'));

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});